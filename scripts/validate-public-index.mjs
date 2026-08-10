import fs from 'node:fs';
const file='public/data/master-index.json'; const data=JSON.parse(fs.readFileSync(file,'utf8'));
if(data.schemaVersion!=='1.0.0') throw new Error('Unsupported schema version');
if(!Array.isArray(data.gates)||data.gates.length!==10) throw new Error('Expected 10 gates');
const weight=data.gates.reduce((s,g)=>s+Number(g.weight||0),0); if(weight!==100) throw new Error(`Gate weights must total 100, got ${weight}`);
const allowed=['PUBLIC','RESTRICTED','CONFIDENTIAL'];
for(const d of data.documents??[]){ if(!allowed.includes(d.publicationLevel)) throw new Error(`Invalid publication level: ${d.id}`); if(d.publicationLevel!=='PUBLIC'||d.publicationApproved!=='Y'){if(d.publicUrl) throw new Error(`Private URL exposed: ${d.id}`)} }
for(const c of data.claims??[]){ if(c.verificationStatus==='verification_required'&&!c.limitation) throw new Error(`Missing limitation: ${c.claimId}`); }
console.log(`Public index valid: ${data.gates.length} gates, weight ${weight}, ${data.documents?.length??0} documents`);
