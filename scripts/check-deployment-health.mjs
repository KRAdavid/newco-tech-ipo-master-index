const endpoint=process.env.DRIVE_INDEX_ENDPOINT;
if(!endpoint){
  console.warn('DRIVE_INDEX_ENDPOINT is not configured; Drive feed and consultation endpoint checks are deferred.');
  process.exit(0);
}

const headers=process.env.DRIVE_SHARED_KEY?{'X-Shared-Key':process.env.DRIVE_SHARED_KEY}:{};
const response=await fetch(endpoint,{headers,redirect:'follow'});
if(!response.ok) throw new Error(`Drive endpoint HTTP ${response.status}`);
const payload=await response.json();
if(payload.schemaVersion!=='1.0.0') throw new Error('Drive endpoint schemaVersion mismatch');
if(!Array.isArray(payload.gates)||payload.gates.length!==10) throw new Error('Drive endpoint must expose 10 gates');
if(payload.gates.reduce((sum,gate)=>sum+Number(gate.weight||0),0)!==100) throw new Error('Drive endpoint gate weights must total 100');
for(const doc of payload.documents??[]){
  if(doc.publicationLevel!=='PUBLIC'||doc.publicationApproved!=='Y') throw new Error(`Drive endpoint exposed non-public document: ${doc.id}`);
  if(doc.publicUrl&&doc.publicationLevel!=='PUBLIC') throw new Error(`Drive endpoint exposed private URL: ${doc.id}`);
}
const lastSyncedAt=payload.source?.lastSyncedAt||payload.generatedAt;
if(!lastSyncedAt||Number.isNaN(Date.parse(lastSyncedAt))) throw new Error('Drive endpoint sync timestamp missing or invalid');
const ageHours=(Date.now()-Date.parse(lastSyncedAt))/36e5;
if(ageHours>168) throw new Error(`Drive endpoint data is stale: ${Math.round(ageHours)} hours`);
console.log(JSON.stringify({endpoint:'reachable',publicFeed:'valid',consultationEndpoint:'shared-web-app-reachable',lastSyncedAt,ageHours:Math.round(ageHours*10)/10}));
