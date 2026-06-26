import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/out/**',
      '**/dist/**',
      '**/build/**',
    ],
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@typescript-eslint': typescriptPlugin,
      prettier: prettierPlugin,
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      ...reactPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      ...reactHooksPlugin.configs.recommended.rules,

      ...typescriptPlugin.configs.recommended.rules,

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
    settings: {
      react: {
        version: 'detect',
      },
      next: {
        rootDir: './',
      },
    },
  },
];
