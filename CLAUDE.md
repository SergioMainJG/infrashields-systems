# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Infrashield Systems — an Angular 22 storefront (zoneless-style standalone components) styled with
Tailwind CSS v4 + daisyUI (`corporate` theme). It's an early-stage build: the current UI is a single
e-commerce landing page (header/search/cart, nav, category sidebar, image carousel).

## Commands

Package manager is **pnpm** (see `pnpm-workspace.yaml`, `angular.json` `cli.packageManager`).

- `pnpm start` — dev server via `nubx ng serve --hmr --live-reload -o` (opens browser, HMR on).
  Plain `ng serve` also works if `nubx` isn't available; it serves the `development` configuration.
- `pnpm build` — production build (`ng build`), output to `dist/`.
- `pnpm watch` — incremental development-configuration build with `--watch`.
- `pnpm test` — runs unit tests via `ng test`, which uses `@angular/build:unit-test` with **Vitest**
  (not Karma/Jasmine). To run a single spec file: `ng test -- src/app/app.spec.ts` (Vitest CLI args
  pass through after `--`).
- `ng generate component <name>` — scaffold a component. VS Code's Angular schematics defaults
  (`.vscode/settings.json`) set `skipStyle: true` and `externalTemplate: true` for `angular-*`
  schematics, so generated components skip a `.css` file and use a separate `.html` template — match
  this by hand when scaffolding via the CLI directly (there are currently no per-component `.css`
  files anywhere in `src/`).

There is no configured lint script; formatting is handled by **oxfmt** (`.oxfmtrc.json`) and
Prettier (`.prettierrc`, with the `angular` parser for `*.html`) — both configured for
`printWidth: 100`, single quotes.

## Architecture

- Entry point: `src/main.ts` bootstraps the standalone root component `App` (`src/app/app.ts`) with
  `appConfig` (`src/app/app.config.ts`). There is no `NgModule` anywhere — every component uses the
  standalone `imports: [...]` array directly.
- Routing (`src/app/app.routes.ts`) is wired up via `provideRouter(routes)` but `routes` is currently
  empty — there's no router-outlet-driven navigation yet; `App` renders its template directly.
- Component file naming drops the `.component` suffix: `app.ts`/`app.html`, `logo.ts`/`logo.html`,
  `image-carousel.ts`/`image-carousel.html`. Follow this convention for new components rather than
  the Angular-CLI default `*.component.ts` naming.
- Components outside `src/app/` are unprefixed top-level features under `src/`, e.g.
  `src/image-carousel/` (selector `image-carousel`, no `app-` prefix) vs. components under
  `src/app/` which use the `app` prefix (e.g. `app-logo`, per `angular.json` `prefix: "app"`).
  Match whichever convention the surrounding directory already uses.
- `ImageCarousel` (`src/image-carousel/image-carousel.ts`) is the one non-trivial component: it's a
  signal-driven carousel (`currentIndex`, `isPaused` signals) with `setInterval`-based autoplay
  (start/stop in `ngOnInit`/`ngOnDestroy`), scroll-snap navigation driven by `viewChild<ElementRef>`
  + `scrollIntoView`, and a `CarouselSlide` interface defining the slide data shape (currently inline
  hardcoded data with external Unsplash image URLs — no backend/data service exists yet).
- Styling is Tailwind v4 utility classes directly in templates (no component-scoped `.css` files);
  global styles/theme live in `src/styles.css`, which imports Tailwind and configures the daisyUI
  `corporate` theme via `@plugin "daisyui/theme"` with custom CSS custom properties (primary,
  secondary, warning, base colors, corner radii). PostCSS is configured for `@tailwindcss/postcss`
  only (`.postcssrc.json`).
- UI text/content in existing templates is in Spanish (es-MX conventions, e.g. "Contáctenos",
  "Acceso a cuenta") — match this when adding user-facing copy unless told otherwise.
- Two skills are available and pre-fetched under `.agents/skills/` /`.claude/skills/`:
  `angular-developer` (Angular framework patterns — signals, forms, DI, routing, testing, etc.) and
  `daisyui` (component/theming reference for every daisyUI component). Prefer consulting these over
  guessing daisyUI class names or Angular API shape.
- `tsconfig.json` enables several stricter compiler flags beyond Angular CLI defaults:
  `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`,
  `noFallthroughCasesInSwitch`, plus Angular's `strictInjectionParameters` and
  `strictInputAccessModifiers`.
