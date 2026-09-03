# Infrashield Systems

An Angular 22 storefront (zoneless-style standalone components) styled with Tailwind CSS v4 and
daisyUI (`corporate` theme). Early-stage build: the current UI is a single e-commerce landing page
(header/search/cart, nav, category sidebar, image carousel).

## Requirements

- Node.js `>= 24.19.0`
- pnpm `11.24.0` (see `pnpm-workspace.yaml`)

## Development server

```bash
pnpm start
```

This runs `nubx ng serve --hmr --live-reload -o --host 0.0.0.0` (falls back to plain `ng serve` if
`nubx` isn't available). Opens the browser automatically with HMR on, serving the `development`
configuration at `http://localhost:4200/`.

## Code scaffolding

```bash
ng generate component component-name
```

Generated components should skip a `.css` file and use a separate `.html` template (see
`.vscode/settings.json` schematics defaults), and drop the `.component` suffix from filenames
(`logo.ts`/`logo.html`, not `logo.component.ts`) to match the rest of the codebase.

For a complete list of available schematics, run:

```bash
ng generate --help
```

## Building

```bash
pnpm build
```

Runs `ng build` (production configuration) and outputs to `dist/infrashield-systems/browser/`.

For an incremental development build that rebuilds on change:

```bash
pnpm watch
```

## Running unit tests

```bash
pnpm test
```

Runs `ng test`, which uses `@angular/build:unit-test` with **Vitest** (not Karma/Jasmine). To run a
single spec file:

```bash
ng test -- src/app/app.spec.ts
```

## Deployment (Cloudflare Pages)

The site is deployed as a static build to Cloudflare Pages via `wrangler.toml`
(`pages_build_output_dir = dist/infrashield-systems/browser`):

```bash
pnpm build
npx wrangler pages deploy
```

The first run will prompt you to log in and link/create the Cloudflare Pages project.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the
[Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page. See `CLAUDE.md`
for architecture notes and project conventions.
