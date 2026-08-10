import fs from 'node:fs';
const html=fs.readFileSync('dist/index.html','utf8');
if(!html.includes('/src/')&&!html.includes('/assets/')) console.warn('Build HTML has no expected script asset marker; inspect manually.');
const data=JSON.parse(fs.readFileSync('public/data/master-index.json','utf8'));
for(const doc of data.documents??[]){if(doc.publicUrl&&doc.publicationLevel!=='PUBLIC') throw new Error(`Private document URL: ${doc.id}`)}
console.log('Static link and publication boundary check passed.');
