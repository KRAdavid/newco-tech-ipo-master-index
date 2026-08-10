import fs from 'node:fs';
const source='src/data/master-index.json'; const target='public/data/master-index.json';
const data=JSON.parse(fs.readFileSync(source,'utf8')); data.syncHealth={mode:'fallback-snapshot',endpointConfigured:false,status:'Drive endpoint 미설정 · 승인 스냅샷'};
fs.writeFileSync(target,JSON.stringify(data,null,2)+'\n'); console.log(`Fallback snapshot written to ${target}`);
