// scripts/vercel-prepare.js
const fs = require('fs');
const path = require('path');

const storybookDir = path.join(__dirname, '..', '.storybook');
const tsPath = path.join(storybookDir, 'main.ts');
const jsPath = path.join(storybookDir, 'main.js');

if (fs.existsSync(tsPath)) {
  fs.copyFileSync(tsPath, jsPath);
  console.log('[Vercel] main.ts copied to main.js');
} else {
  console.error('[Vercel] main.ts not found');
}
