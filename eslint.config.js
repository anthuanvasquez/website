import vitest from '@vitest/eslint-plugin';
import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import tsEslint from 'typescript-eslint';

import { baseConfig } from './eslint-config/base.js';

export const nuxtConfig = tsEslint.config(
  ...baseConfig,
  ...(await createConfigForNuxt({
    features: {
      typescript: true,
      tooling: true,
    },
  })),
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/html-self-closing': 'off',
    },
  },
  {
    files: ['tests/**'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  }
);

export default nuxtConfig;
