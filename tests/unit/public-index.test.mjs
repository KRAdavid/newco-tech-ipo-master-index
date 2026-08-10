import {describe, expect, it} from 'vitest';
import fs from 'node:fs';

const index=JSON.parse(fs.readFileSync(new URL('../../public/data/master-index.json',import.meta.url),'utf8'));

describe('public index safety contract',()=>{
  it('keeps ten gates with 100 total weight',()=>{
    expect(index.gates).toHaveLength(10);
    expect(index.gates.reduce((sum,gate)=>sum+gate.weight,0)).toBe(100);
  });
  it('does not expose non-public document URLs',()=>{
    for(const doc of index.documents){
      if(doc.publicationLevel!=='PUBLIC'||doc.publicationApproved!=='Y') expect(doc.publicUrl).toBeUndefined();
    }
  });
  it('marks the 81 g/L claim as requiring verification',()=>{
    const claim=index.claims.find(c=>c.claimId==='CLM-001');
    expect(claim.verificationStatus).toBe('verification_required');
    expect(claim.limitation).toContain('질량수지');
  });
  it('distinguishes priority and expansion products',()=>{
    expect(index.products.filter(p=>p.stage==='우선 상용화')).toHaveLength(2);
    expect(index.products.filter(p=>p.stage==='검증 중인 확장 파이프라인')).toHaveLength(2);
  });
});
