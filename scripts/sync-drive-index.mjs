import fs from 'node:fs';
const endpoint=process.env.DRIVE_INDEX_ENDPOINT;
if(!endpoint){console.warn('DRIVE_INDEX_ENDPOINT is not configured; retaining approved snapshot.');process.exit(0)}
const response=await fetch(endpoint,{headers:process.env.DRIVE_SHARED_KEY?{'X-Shared-Key':process.env.DRIVE_SHARED_KEY}:{}});
if(!response.ok) throw new Error(`Drive endpoint failed: ${response.status}`);
const body=await response.text(); const payload=JSON.parse(body);
if(payload.schemaVersion!=='1.0.0'||!Array.isArray(payload.gates)||payload.gates.length!==10) throw new Error('Endpoint payload does not match public schema');
if(payload.gates.reduce((sum,g)=>sum+Number(g.weight||0),0)!==100) throw new Error('Endpoint gate weights must total 100');
for(const doc of payload.documents??[]){if(doc.publicationLevel!=='PUBLIC'||doc.publicationApproved!=='Y') throw new Error(`Endpoint exposed non-public document: ${doc.id}`); if(doc.publicUrl&&doc.publicationLevel!=='PUBLIC') throw new Error(`Endpoint exposed private URL: ${doc.id}`)}
fs.writeFileSync('public/data/master-index.json',body+'\n'); console.log('Drive index synced.');
