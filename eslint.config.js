import js from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...pluginQuery.configs['flat/recommended'],
      importPlugin.flatConfigs.recommended,
    ],
    files: ['**/*.{js,ts,tsx,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
    },
    rules: {
      'no-alert': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandFirst: true,
          ignoreCase: true,
          noSortAlphabetically: true,
          reservedFirst: true,
        },
      ],
      'import/order': [
        'error',
        {
          pathGroups: [
            'app',
            'processes',
            'pages',
            'widgets',
            'features',
            'entities',
            'shared',
          ].map((layer) => ({
            pattern: `**/?(*)${layer}{,/**}`,
            group: 'internal',
          })),
          pathGroupsExcludedImportTypes: ['builtin'],
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-unresolved': 'error',
      'import/no-cycle': ['error', { maxDepth: 1 }],
      '@typescript-eslint/no-empty-object-type': 'off',
      'prettier/prettier': 'error',
      ...prettierConfig.rules,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  }
)
