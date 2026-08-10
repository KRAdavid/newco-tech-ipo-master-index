import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { describe, expect, it } from 'vitest';

const execFileAsync = promisify(execFile);
const root = path.resolve(import.meta.dirname, '../..');
const script = path.join(root, 'scripts', 'sync-drive-index.mjs');
const snapshot = JSON.parse(fs.readFileSync(path.join(root, 'public', 'data', 'master-index.json'), 'utf8'));

function serve(payload, status = 200) {
  const server = http.createServer((_request, response) => {
    response.writeHead(status, { 'content-type': 'application/json' });
    response.end(JSON.stringify(payload));
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => {
    const { port } = server.address();
    resolve({ server, endpoint: `http://127.0.0.1:${port}/index` });
  }));
}

async function runSync(endpoint, target) {
  return execFileAsync(process.execPath, [script], {
    cwd: root,
    env: { ...process.env, DRIVE_INDEX_ENDPOINT: endpoint, PUBLIC_INDEX_PATH: target },
  });
}

describe('Drive sync workflow contract', () => {
  it('writes a valid approved endpoint payload to the configured target', async () => {
    const temp = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'master-index-sync-'));
    const target = path.join(temp, 'master-index.json');
    const payload = { ...snapshot, generatedAt: '2026-08-10T00:00:00.000Z', documents: snapshot.documents.filter((doc) => doc.publicationLevel === 'PUBLIC' && doc.publicationApproved === 'Y') };
    const { server, endpoint } = await serve(payload);
    try {
      await runSync(endpoint, target);
      expect(JSON.parse(await fs.promises.readFile(target, 'utf8'))).toMatchObject({
        schemaVersion: '1.0.0',
        generatedAt: payload.generatedAt,
      });
    } finally {
      server.close();
      await fs.promises.rm(temp, { recursive: true, force: true });
    }
  });

  it('rejects non-public documents before replacing the existing snapshot', async () => {
    const temp = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'master-index-sync-'));
    const target = path.join(temp, 'master-index.json');
    const original = JSON.stringify({ sentinel: true });
    await fs.promises.writeFile(target, original);
    const payload = { ...snapshot, documents: snapshot.documents.filter((doc) => doc.publicationLevel === 'PUBLIC' && doc.publicationApproved === 'Y').map((doc, index) => index === 0 ? { ...doc, publicationApproved: 'N' } : doc) };
    const { server, endpoint } = await serve(payload);
    try {
      await expect(runSync(endpoint, target)).rejects.toThrow('Endpoint exposed non-public document');
      expect(await fs.promises.readFile(target, 'utf8')).toBe(original);
    } finally {
      server.close();
      await fs.promises.rm(temp, { recursive: true, force: true });
    }
  });
});
