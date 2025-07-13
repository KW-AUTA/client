// /// <reference types="vitest/config" />
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';
// import svgr from 'vite-plugin-svgr';

// // https://vite.dev/config/
// import { fileURLToPath } from 'node:url';
// import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
// const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// // More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
// export default defineConfig({
//   plugins: [react(), svgr()],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, './src')
//     }
//   },
//   test: {
//     projects: [
//       {
//         extends: true,
//         plugins: [
//           // The plugin will run tests for the stories defined in your Storybook config
//           // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
//           storybookTest({
//             configDir: path.join(dirname, '.storybook')
//           })
//         ],
//         test: {
//           name: 'storybook',
//           browser: {
//             enabled: true,
//             headless: true,
//             provider: 'playwright',
//             instances: [
//               {
//                 browser: 'chromium'
//               }
//             ]
//           },
//           setupFiles: ['.storybook/vitest.setup.ts']
//         }
//       }
//     ]
//   }
// });

/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import fs from 'fs';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// ✅ Vercel 환경에서 .storybook/main.ts → main.js 복사
if (process.env.VERCEL) {
  const storybookDir = path.join(dirname, '.storybook');
  const tsPath = path.join(storybookDir, 'main.ts');
  const jsPath = path.join(storybookDir, 'main.js');
  if (fs.existsSync(tsPath) && !fs.existsSync(jsPath)) {
    fs.copyFileSync(tsPath, jsPath);
    console.log('[Vercel Build] Copied main.ts → main.js');
  }
}

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook')
          })
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [
              {
                browser: 'chromium'
              }
            ]
          },
          setupFiles: ['.storybook/vitest.setup.ts']
        }
      }
    ]
  }
});
