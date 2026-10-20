import { readFile } from 'node:fs/promises';
import { canonicalize, digest, parseDescription } from 'mailschema';
const original = parseDescription(await readFile('description.json'));
const reversed = parseDescription(JSON.stringify(Object.fromEntries(Object.entries(original).reverse())));
if (canonicalize(original) !== canonicalize(reversed) || digest(original) !== digest(reversed)) throw new Error('Key-order check failed');
console.log(JSON.stringify({ originalDigest: digest(original), reversedTopLevelKeyDigest: digest(reversed), equalCanonicalJSON: true }));
