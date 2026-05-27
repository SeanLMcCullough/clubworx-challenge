import love from 'eslint-config-love'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'

export default [
  {
    ...love,
    files: ['**/*.{ts,tsx}'],
    settings: {
      react: { version: '19' }
    }
  },
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  pluginReactHooks.configs.flat['recommended-latest'],
  {
    rules: {
      'react/prop-types': 'off'
    }
  }
]
