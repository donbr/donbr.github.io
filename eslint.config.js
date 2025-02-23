import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    // Main config for source files
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        window: true,
        document: true,
        cytoscape: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin
    },
    rules: {
      'no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn'
    },
    settings: { react: { version: 'detect' } }
  },
  {
    // Override for test files
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/*.test.[jt]s?(x)'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        window: true,
        document: true,
        jest: true,
        describe: true,
        it: true,
        expect: true
      }
    }
  },
  {
    // Override for CommonJS files (.cjs)
    files: ['**/*.cjs'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
        window: true,
        document: true,
        fetch: true,
        console: true,
        alert: true,
        cytoscape: 'readonly',
        _: 'readonly',
        echarts: 'readonly'
      }
    }
  },
  {
    // Override for setupTests.ts and similar test setup files
    files: ['**/setupTests.ts'],
    languageOptions: {
      globals: {
        require: true,
        global: true,
        jest: true,
        describe: true,
        it: true,
        expect: true,
        beforeEach: true,
        window: true,
        document: true
      }
    }
  }
];