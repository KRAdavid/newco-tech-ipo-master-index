import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const root = path.resolve(import.meta.dirname, '../..');
const index = JSON.parse(fs.readFileSync(path.join(root, 'public', 'data', 'master-index.json'), 'utf8'));

describe('public index integration contract', () => {
  it('publishes separated patent states without exposing restricted documents', () => {
    expect(index.technology.registeredPatents).toEqual([]);
    expect(index.technology.patentApplications.length).toBeGreaterThan(0);
    expect(index.technology.patentApplications.every((item) => item.includes('특허출원'))).toBe(true);
    expect(index.documents.filter((doc) => doc.publicationLevel !== 'PUBLIC' || doc.publicationApproved !== 'Y')).toHaveLength(1);
    expect(index.documents.filter((doc) => doc.publicUrl)).toHaveLength(0);
  });

  it('keeps readiness and consultation context internally consistent', () => {
    expect(index.gates).toHaveLength(10);
    expect(index.gates.reduce((sum, gate) => sum + Number(gate.weight), 0)).toBe(100);
    expect(index.consultationCategories).toHaveLength(13);
    expect(index.claims.find((claim) => claim.claimId === 'CLM-001')).toMatchObject({
      evidenceLevel: 'patent_application',
      verificationStatus: 'verification_required',
    });
  });
});
