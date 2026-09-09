import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

/** Base config — TypeScript rules shared across all workspaces */
export const baseConfig = tsEslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.nuxt/**',
      '**/.output/**',
      '**/coverage/**',
      '*.config.js',
      '*.config.mjs',
    ],
  },
  eslint.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsEslint.parser,
    },
    rules: {
      ...prettierConfig.rules,

      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-implicit-coercion': 'warn',
      eqeqeq: ['error', 'always'],
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      complexity: ['error', { max: 10 }],
      'max-depth': ['error', 3],
      'max-nested-callbacks': ['error', 3],
      'max-params': ['warn', 4],
      'max-lines-per-function': [
        'warn',
        {
          max: 60,
          skipBlankLines: true,
          skipComments: true,
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',

      // Allow `declare global { namespace ... }` for module augmentation
      '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],

      'prettier/prettier': 'error',
    },
  }
);

export default baseConfig;
