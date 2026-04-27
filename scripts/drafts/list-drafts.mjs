import fs from 'node:fs';
import path from 'node:path';

const draftsDir = path.join(process.cwd(), 'CONTENT', 'drafts');

if (!fs.existsSync(draftsDir)) {
  console.log('No drafts directory found.');
  process.exit(0);
}

const drafts = fs
  .readdirSync(draftsDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => {
    const draft = JSON.parse(fs.readFileSync(path.join(draftsDir, file), 'utf8'));
    return { file, ...draft };
  });

if (drafts.length === 0) {
  console.log('No drafts found.');
  process.exit(0);
}

for (const draft of drafts) {
  console.log(`- ${draft.title}`);
  console.log(`  file: ${draft.file}`);
  console.log(`  category: ${draft.category}`);
  console.log(`  keyword: ${draft.focusKeyword}`);
  console.log('');
}
