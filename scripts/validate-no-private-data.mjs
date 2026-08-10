import fs from 'node:fs';
const text=fs.readFileSync('public/data/master-index.json','utf8');
const patterns=[/\d{6}-?\d{7}/,/[\w.+-]+@[\w-]+\.[\w.-]+/,/01[016789]-?\d{3,4}-?\d{4}/i,/gh[pousr]_[A-Za-z0-9_]+/i,/AIza[\w-]{20,}/i,/RESTRICTED[^\n]{0,80}(drive\.google|docs\.google)/i];
for(const p of patterns) if(p.test(text)) throw new Error(`Potential private data pattern found: ${p}`);
console.log('Private data scan passed (fail-closed).');
