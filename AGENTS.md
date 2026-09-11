# AGENTS.md — n8n-talks

Custom n8n setup: open-source workflow engine + custom nodes. npm workspaces monorepo.

## Structure

- `packages/n8n-nodes-dice/` — custom n8n node package (`n8n-nodes-dice@1.0.0`).
  - `nodes/<Name>/<Name>.node.ts` — node implementation
  - `nodes/<Name>/<Name>.node.json` — node metadata / codex
  - `nodes/<Name>/*.svg` — node icon
  - `credentials/*.credentials.ts` — node credentials
  - `gulpfile.js` — copies icons (`*.svg`, `*.node.json`) to `dist/`
  - Builds to `dist/` (`files: ["dist"]`, entry `index.js`)
- `packages/n8n-runtime/` — runnable n8n (`n8n@0.183.0`) depending on the local `n8n-nodes-dice`.

Key deps: `n8n-core@0.123.0`, `n8n-workflow@0.105.0`, TypeScript 4.7, tslint 6.1, jest 28 + ts-jest, gulp 4, nodelinter 0.1.19.

## Commands

Run from repo root (npm or yarn, workspaces = `packages/*`):

```bash
npm install          # or: yarn
npm run n8n          # or: yarn n8n — builds dice package (pren8n) then starts n8n runtime
```

In `packages/n8n-nodes-dice`:

```bash
npm run build    # tsc && gulp — always build before testing in n8n
npm run dev      # npm run watch — tsc --watch during node dev
npm run lint     # tslint -p tsconfig.json -c tslint.json
npm run lintfix  # tslint --fix
npm run nodelinter
npm test         # jest
```

## Conventions for agents

- New custom node: create `nodes/<Name>/<Name>.node.ts` + `<Name>.node.json` + icon `.svg`, then register the compiled `.js` path in `package.json` under `n8n.nodes` and rebuild (`npm run build`).
- New credential: add `credentials/*.credentials.ts` and register under `n8n.credentials` in `package.json`.
- Do not hand-edit `dist/`; it is build output (tsc + gulp copies icons/json).
- Keep `n8n-core` / `n8n-workflow` versions in sync with what the node API expects; bumping `n8n@0.183.0` in runtime is a breaking-change-prone operation — test `npm run n8n` after.
- Lint with tslint config (`tslint.json`), not eslint; run `nodelinter` before submitting new nodes.
- Node class/file naming must end in `.node.ts` (n8n convention).
