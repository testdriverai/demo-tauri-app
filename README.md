# Tauri + React + Typescript

This template should help get you started developing with Tauri, React and Typescript in Vite.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)


## Development

### Web

```shell
pnpm dev
```

### Desktop

```shell
pnpm tauri dev
```

### iOS

```shell
pnpm tauri ios dev
```

## Testing 

### Web

> See: https://docs.testdriver.ai/getting-started/playwright

When running Playwright, `pnpm dev` is ran automatically to launch the Vite server.

```shell
pnpm test tests/testdriver.spec.ts
```

### Native

```shell