#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsPath = path.join(__dirname, '..', 'lib', 'posts.ts');

function parseTopLevelPostObjects(arrayContent) {
  const entries = [];
  let inString = false;
  let stringQuote = '';
  let escaped = false;
  let depth = 0;
  let objectStart = -1;

  for (let index = 0; index < arrayContent.length; index += 1) {
    const char = arrayContent[index];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === '\\') {
        escaped = true;
        continue;
      }
      if (char === stringQuote) {
        inString = false;
        stringQuote = '';
      }
      continue;
    }

    if (char === '"' || char === "'") {
      inString = true;
      stringQuote = char;
      continue;
    }

    if (char === '{') {
      if (depth === 0) {
        objectStart = index;
      }
      depth += 1;
      continue;
    }

    if (char === '}') {
      depth -= 1;
      if (depth === 0 && objectStart !== -1) {
        let objectEnd = index + 1;
        while (objectEnd < arrayContent.length && /\s/.test(arrayContent[objectEnd])) {
          objectEnd += 1;
        }
        if (arrayContent[objectEnd] === ',') {
          objectEnd += 1;
        }

        entries.push(arrayContent.slice(objectStart, objectEnd));
        objectStart = -1;
      }
    }
  }

  return entries;
}

function extractValue(entry, key) {
  const regex = new RegExp(`${key}\\s*:\\s*"([^\\"]+)"`);
  const match = entry.match(regex);
  return match ? match[1] : null;
}

function toTimestamp(dateValue) {
  if (!dateValue) return Number.NEGATIVE_INFINITY;
  const timestamp = new Date(dateValue).getTime();
  return Number.isNaN(timestamp) ? Number.NEGATIVE_INFINITY : timestamp;
}

function main() {
  if (!fs.existsSync(postsPath)) {
    throw new Error(`Fichier introuvable: ${postsPath}`);
  }

  const fileContent = fs.readFileSync(postsPath, 'utf8');
  const startToken = 'export const posts: Post[] = [';
  const startIndex = fileContent.indexOf(startToken);

  if (startIndex === -1) {
    throw new Error('Bloc posts introuvable dans lib/posts.ts');
  }

  const assignmentIndex = fileContent.indexOf('=', startIndex);
  const arrayStart = fileContent.indexOf('[', assignmentIndex);
  const arrayEndToken = '\n];';
  const arrayEnd = fileContent.indexOf(arrayEndToken, arrayStart);

  if (arrayStart === -1 || arrayEnd === -1) {
    throw new Error('Impossible de localiser la fin du tableau posts');
  }

  const prefix = fileContent.slice(0, arrayStart + 1);
  const arrayContent = fileContent.slice(arrayStart + 1, arrayEnd);
  const suffix = fileContent.slice(arrayEnd);

  const entries = parseTopLevelPostObjects(arrayContent);
  if (entries.length === 0) {
    throw new Error('Aucun objet post trouvé à parser');
  }

  const bySlug = new Map();
  const order = [];

  for (const entry of entries) {
    const slug = extractValue(entry, 'slug');
    const dateValue = extractValue(entry, 'date');

    if (!slug) {
      order.push({ slug: null, entry });
      continue;
    }

    if (!bySlug.has(slug)) {
      bySlug.set(slug, { entry, date: toTimestamp(dateValue) });
      order.push({ slug, entry });
      continue;
    }

    const current = bySlug.get(slug);
    const candidateDate = toTimestamp(dateValue);
    if (candidateDate >= current.date) {
      bySlug.set(slug, { entry, date: candidateDate });
    }
  }

  const uniqueEntries = [];
  const seen = new Set();

  for (const item of order) {
    if (!item.slug) {
      uniqueEntries.push(item.entry.trim().replace(/,+\s*$/, ''));
      continue;
    }

    if (seen.has(item.slug)) {
      continue;
    }

    const finalEntry = bySlug.get(item.slug)?.entry;
    if (finalEntry) {
      uniqueEntries.push(finalEntry.trim().replace(/,+\s*$/, ''));
      seen.add(item.slug);
    }
  }

  const removedCount = entries.length - uniqueEntries.length;
  const rebuiltArray = `\n${uniqueEntries.map((entry) => `  ${entry},`).join('\n\n')}\n`;
  const updated = `${prefix}${rebuiltArray}${suffix}`;

  if (updated !== fileContent) {
    fs.writeFileSync(postsPath, updated, 'utf8');
  }

  console.log(`Total: ${entries.length}`);
  console.log(`Uniques: ${uniqueEntries.length}`);
  console.log(`Supprimés: ${removedCount}`);
}

try {
  main();
} catch (error) {
  console.error(`Erreur: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}
