# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 重要: ユーザーからの指示

このプロジェクトは日本語が母語の日本人によって開発されています。可能な限り日本語で回答してください。
ただし、技術的な用語は無理に翻訳を行わずとも問題ありません。

## Project Overview

オンラインで [wiredify](https://github.com/oageo/wiredify) を実行するための Nuxt 4 製 Web アプリ。Rust の外部クレート `wiredify`（crates.io）を WebAssembly にコンパイルし、ブラウザ内だけで日本語テキスト変換を行う。サーバーサイドの処理はない。

## Development Commands

Node.js ^22.19.0 以上（Nuxt 4 の要件）、pnpm 12、Rust ツールチェーン（`wasm32-unknown-unknown` ターゲット）が必要。`wasm-pack` 自体は npm の devDependency として入る。

pnpm 12 は未承認のビルドスクリプトがあると install がエラーになる。許可リストは `pnpm-workspace.yaml` の `allowBuilds` にあり、依存追加で新たに必要になったら `pnpm approve-builds <pkg>` で追加する。

```bash
pnpm install    # postinstall で nuxt prepare も実行される
pnpm dev        # WASM ビルド → nuxt dev
pnpm wasm       # WASM ビルドのみ（wasm-pack build wiredify_lib --target web）
pnpm build      # WASM ビルド → nuxt build
pnpm generate   # WASM ビルド → 静的サイト生成
pnpm preview    # ビルド済み成果物のプレビュー（WASM ビルドは走らない）
```

テストスイート・Linter は存在しない。

## Architecture

Nuxt 4 だが `app/` ディレクトリは使わず、旧来のルート直下構成（`pages/`・`components/`・`app.vue`）のまま。`app/` を作ると srcDir が切り替わるので注意。

- `pages/index.vue` — 唯一のページ。入力→`wiredify()` 呼び出し→出力の UI とロジックがすべてここにある。
- `components/woheader.vue` / `wofooter.vue` — Nuxt の自動インポートで `<Woheader />` / `<Wofooter />` として使われる。
- `wiredify_lib/` — `wiredify` クレートを `#[wasm_bindgen]` で包むだけの Rust クレート。変換ロジックはすべて外部クレート側にあるため、変換結果の挙動を変えたい場合は `Cargo.toml` の `wiredify` バージョンを上げる。`crate-type = ["cdylib", "rlib"]` は wasm-pack に必須。

### WASM Integration

`wasm-pack build --target web` が `wiredify_lib/pkg/` に JS/WASM を出力する。`pkg/` は gitignore 対象なので、クローン直後や Rust 側を変更した後は `pnpm wasm`（または `pnpm dev`）を実行しないとインポートが解決しない。`nuxt dev` は Rust ソースを監視しない。

出力 JS は `new URL('wiredify_lib_bg.wasm', import.meta.url)` で WASM を取得するため、Vite 標準のアセット処理だけで動き、WASM 用の Vite プラグインは不要（`vite-plugin-top-level-await` は Vite 8 / rolldown と非互換でビルドが失敗するので入れないこと）。インポートはパッケージ名ではなくファイルパスで行う：

```typescript
import init, { wiredify } from "~/wiredify_lib/pkg/wiredify_lib.js";

onMounted(async () => {
  await init();  // 完了前に wiredify() を呼ぶと失敗する
});
```

### PurgeCSS と Bulma

Bulma は `nuxt.config.ts` の `css: ["bulma"]` でグローバルに読み込んでいる。`nuxt-purgecss` モジュールは Nuxt 4 非対応のため使わず、`nuxt.config.ts` の `$production.postcss.plugins` で `@fullhuman/postcss-purgecss` を直接設定している（本番ビルド時のみ有効、dev では無効）。そのため、JS 側で文字列を組み立てて付与する Bulma クラス名はビルド時に削除される場合がある。テンプレートにリテラルで書いたクラス名は安全。
