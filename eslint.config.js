import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginCypress from 'eslint-plugin-cypress/flat';
import daStyle from 'eslint-config-dicodingacademy';



export default [
  { files: ['**/*.{js,mjs,cjs,jsx}'] },
  {
    languageOptions: { globals: globals.browser }, settings: {
      react: {
        version: 'detect', // Deteksi otomatis versi React
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  daStyle,
  pluginCypress.configs.recommended,
];