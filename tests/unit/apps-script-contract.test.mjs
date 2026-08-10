import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = path.resolve(import.meta.dirname, '../..');
const source = fs.readFileSync(path.join(root, 'apps-script', 'Code.gs'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'apps-script', 'appsscript.json'), 'utf8'));

describe('Apps Script deployment contract', () => {
  it('contains the required public and automation entry points', () => {
    for (const name of [
      'setupProject',
      'ensureSheetsAndHeaders',
      'scanDriveAndUpsertDocuments',
      'buildPublicIndex',
      'validatePublicIndex',
      'publishPublicJson',
      'installAutomation',
      'removeAutomation',
      'handleInquiry',
      'sendInquiryNotifications',
      'writeSyncLog',
      'writeAuditLog',
      'doGet',
      'doPost',
    ]) {
      expect(source).toMatch(new RegExp(`function\\s+${name}\\s*\\(`));
    }
  });

  it('keeps the public feed fail-closed and excludes private URLs', () => {
    expect(source).toContain("publicationLevel!=='PUBLIC'");
    expect(source).toContain("publicationApproved");
    expect(source).toContain('validatePublicIndex(output)');
    expect(source).toContain('PUBLIC + Y');
    expect(source).toContain("publicUrl");
    expect(source).toContain('registeredPatents');
    expect(source).toContain('patentApplications');
  });

  it('keeps inquiry input bounded, consent-gated, and duplicate-limited', () => {
    expect(source).toContain('const allowed=');
    expect(source).toContain('clean.consent!==\'true\'');
    expect(source).toContain('slice(0,max||500)');
    expect(source).toContain('formStartedAt');
    expect(source).toContain('DigestAlgorithm.MD5');
    expect(source).toContain('CacheService.getScriptCache');
    expect(source).toContain("function doPost(e)");
    expect(source).toContain('PENDING_NOTIFICATION');
    expect(source).toContain("writeSyncLog('inquiry-notification'");
  });

  it('uses the Apps Script web-app runtime and does not embed credentials', () => {
    expect(manifest.timeZone).toBe('Asia/Seoul');
    expect(manifest.exceptionLogging).toBe('STACKDRIVER');
    expect(source).not.toMatch(/ghp_[A-Za-z0-9_]+/);
    expect(source).not.toMatch(/AIza[A-Za-z0-9_-]{20,}/);
  });
});
