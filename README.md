# @lamsal-de/eslint-config

Install this package, then create a prettier and a eslint config. There are eslint configs for available for 
svelte, vue and react as-well as a prettier config. Those are referencable as relative exports, i.e.:
- @lamsal-de/eslint-config/svelte
- @lamsal-de/eslint-config/vue
- @lamsal-de/eslint-config/react
- @lamsal-de/eslint-config/prettier

## Setup

### CLI

Run `npx @lamsal-de/eslint-config init (ts|react|vue|svelte)`. If you try to install at a workspace root, you can try
```shell
npm_config_ignore_workspace_root_check=true pnpx @lamsal-de/eslint-config@latest init
```

### Manually

add the following to your `package.json` file/configuration files:

```json
{
  "devDependencies": {
    "prettier": "...",
    "eslint": "...",
    "@lamsal-de/eslint-config": "..."
  },
  "prettier": "@lamsal-de/eslint-config/prettier",
  "eslintConfig": {
    "extends": [
      "@lamsal-de/eslint-config/svelte"
    ]
  }
}
```
