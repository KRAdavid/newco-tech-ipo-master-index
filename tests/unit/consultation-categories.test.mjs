import {describe, expect, it} from 'vitest';
import fs from 'node:fs';

const index=JSON.parse(fs.readFileSync(new URL('../../public/data/master-index.json',import.meta.url),'utf8'));

describe('consultation category contract',()=>{
  it('publishes all 13 categories without private fields',()=>{
    expect(index.consultationCategories).toHaveLength(13);
    expect(index.consultationCategories.every(category=>category.id&&category.name&&category.description)).toBe(true);
    expect(JSON.stringify(index.consultationCategories)).not.toMatch(/@|drive\.google\.com\/file/);
  });
});
