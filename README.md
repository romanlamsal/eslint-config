# lamsal-node-defaults

Install this package, then create a prettier and a eslint config. There are eslint configs for available for 
svelte, vue and react as-well as a prettier config. Those are referencable as relative exports, i.e.:
- @lamsal-de/eslint-config/svelte
- @lamsal-de/eslint-config/vue
- @lamsal-de/eslint-config/react
- @lamsal-de/eslint-config/prettier

## Recommended setup

Copy & paste the following code to your `package.json`. Replace `svelte` with your framework of choice:

```json
{
  "prettier": "@lamsal-de/eslint-config/prettier",
  "eslintConfig": {
    "extends": ["@lamsal-de/eslint-config/svelte"]
  }
}
```
