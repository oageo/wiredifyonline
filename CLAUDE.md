# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 重要: ユーザーからの指示

このプロジェクトは日本語が母語の日本人によって開発されています。可能な限り日本語で回答してください。
ただし、技術的な用語は無理に翻訳を行わずとも問題ありません。

## Project Overview

This is a Nuxt.js web application that provides an online interface for the "wiredify" text transformation tool. The project combines a Vue.js frontend with a Rust WebAssembly library to perform text transformations in the browser.

## Architecture

- **Frontend**: Nuxt.js 3 application using Vue 3 and TypeScript
- **Backend Logic**: Rust library (`wiredify_lib`) compiled to WebAssembly 
- **Styling**: Bulma CSS framework with PurgeCSS optimization
- **Package Manager**: pnpm

The application follows a simple architecture:
1. Main entry point: `app.vue` renders pages
2. Primary page: `pages/index.vue` contains the text transformation interface
3. Components: `woheader.vue` and `wofooter.vue` for layout
4. WASM integration: Rust library in `wiredify_lib/` provides the core transformation logic

## Development Commands

```bash
# Install dependencies
pnpm install

# Build WASM library and start development server
pnpm dev

# Build WASM library only
pnpm wasm

# Build for production
pnpm build

# Generate static site
pnpm generate

# Preview production build
pnpm preview
```

## Key Dependencies and Integration

- The WASM library must be built before running any Nuxt commands (handled automatically in scripts)
- Uses `vite-plugin-wasm-pack` to integrate the Rust library
- Bulma provides all styling - no custom CSS classes needed
- Application is configured for Japanese language (`lang="ja"`)

## File Structure Notes

- `wiredify_lib/`: Rust crate that wraps the external `wiredify` crate for WASM
- Components use the `Wo` prefix (e.g., `Woheader`, `Wofooter`)
- Single page application with main functionality in `pages/index.vue`
- WASM module is initialized on page mount before use

## WASM Integration Pattern

The Rust library is imported and initialized in Vue components:
```typescript
import init, { wiredify } from "wiredify_lib";

onMounted(async () => {
  await init(); 
});
```

Always ensure WASM is initialized before calling any exported functions.