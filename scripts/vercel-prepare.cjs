const fs = require('fs');
const path = require('path');

const storybookDir = path.join(__dirname, '..', '.storybook');
const tsPath = path.join(storybookDir, 'main.ts');
const jsPath = path.join(storybookDir, 'main.js');

if (fs.existsSync(tsPath)) {
  let content = fs.readFileSync(tsPath, 'utf-8');

  // TypeScript 문법 제거
  content = content
    .replace(/import type\s+{([^}]+)}\s+from\s+['"][^'"]+['"];/g, "import { } from '@storybook/react-vite';")
    .replace(/: StorybookConfig/g, '');

  fs.writeFileSync(jsPath, content, 'utf-8');
  console.log('[Vercel] Converted and copied main.ts → main.js');
} else {
  console.error('[Vercel] main.ts not found');
}
