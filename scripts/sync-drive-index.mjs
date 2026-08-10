import fs from 'node:fs';
const endpoint=process.env.DRIVE_INDEX_ENDPOINT;
if(!endpoint){console.warn('DRIVE_INDEX_ENDPOINT is not configured; retaining approved snapshot.');process.exit(0)}
const response=await fetch(endpoint,{headers:process.env.DRIVE_SHARED_KEY?{'X-Shared-Key':process.env.DRIVE_SHARED_KEY}:{}});
if(!response.ok) throw new Error(`Drive endpoint failed: ${response.status}`);
const body=await response.text(); JSON.parse(body);
fs.writeFileSync('public/data/master-index.json',body+'\n'); console.log('Drive index synced.');
