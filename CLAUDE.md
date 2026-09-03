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


## Slides to update

### Telefonía y Redes

Opción 1: Enfoque en Arquitectura y Rendimiento (Recomendada)

    Título: Arquitectura de Networking y Telefonía IP

    Descripción: Diseño, implementación y gestión de topologías de red escalables (LAN/WAN) y switches empresariales. Optimizamos el tráfico de red (QoS) para garantizar comunicaciones VoIP de alta fidelidad, integración de sistemas IP PBX y estabilidad total en tus troncales SIP.

Opción 2: Enfoque Integral (Infraestructura Completa)

    Título: Networking Avanzado y Comunicaciones Unificadas

    Descripción: Gestión integral de tu infraestructura de red. Desde la auditoría de enlaces de fibra óptica y configuración de hardware de red, hasta el despliegue de conmutadores IP. Construimos bases de red robustas que eliminan cuellos de botella y soportan el tráfico crítico de tu empresa.

Opción 3: Orientada a la Solución de Problemas (Troubleshooting & Core)

    Título: Soluciones de Networking y Conectividad Empresarial

    Descripción: Administración y despliegue de redes corporativas. Aseguramos la continuidad operativa mediante el monitoreo de hardware, diagnóstico avanzado de enlaces, configuración de redes seguras y el soporte especializado de tu infraestructura de voz y datos.


### Servicios en la Nube . Enfocado a Office 365, Azure y herramientas de seguridad de esas plataformas 

Opción 1: Enfoque en Seguridad e Identidad (Recomendada por tu énfasis en seguridad)

    Título: Seguridad Cloud y Ecosistema Microsoft

    Descripción: Protegemos la infraestructura y los datos de tu empresa. Implementamos gestión de identidad y accesos con Microsoft Entra ID, respaldo seguro con Recovery Services Vault, cifrado con BitLocker y políticas de retención estrictas en Exchange Online.

Opción 2: Enfoque en Arquitectura y Automatización (Más técnico e integral)

    Título: Arquitectura Cloud: Azure y Microsoft 365

    Descripción: Diseño, administración y optimización de entornos en la nube. Desde el despliegue de infraestructura en Azure (Application Gateway, Network Watcher) hasta la automatización avanzada de procesos y políticas en Microsoft 365 mediante scripts de PowerShell.

Opción 3: Enfoque Comercial (Orientado a la tranquilidad del cliente)

    Título: Gestión Cloud y Continuidad de Negocio

    Descripción: Maximiza la productividad y seguridad de tu empresa con Azure y Office 365. Nos encargamos de la administración integral de tus inquilinos (tenants), auditoría de accesos, control de costos y estrategias de recuperación de desastres para garantizar que tu operación nunca se detenga.


### Necesito Enfoque en la vertical de "Acronis y Antivirus Microsoft , Defender, etc.." 

Opción 1: Enfoque Técnico y de Ciberseguridad (Recomendada)

    Título: Ciberseguridad y Protección de Endpoints

    Descripción: Implementación de estrategias de defensa en profundidad. Desplegamos Microsoft Defender (XDR/EDR) para el bloqueo avanzado de malware y ransomware, respaldado por soluciones de Disaster Recovery y copias de seguridad inmutables con tecnología de Acronis.

Opción 2: Enfoque en la Resiliencia y Continuidad (Más comercial)

    Título: Continuidad de Negocio y Resguardo de Datos

    Descripción: Blindamos tu infraestructura contra amenazas modernas. Combinamos el análisis y mitigación de amenazas en tiempo real del antivirus y ecosistema Defender, con los respaldos empresariales de Acronis para garantizar que tu información crítica siempre pueda ser recuperada.

Opción 3: Enfoque Integral (Gestión y Prevención)

    Título: Seguridad Perimetral y Resiliencia Operativa

    Descripción: Gestión integral de la seguridad de tus dispositivos. Desde la prevención activa de ciberataques y monitoreo de vulnerabilidades con las herramientas de seguridad de Microsoft, hasta la protección de cargas de trabajo y restauración de sistemas completos con Acronis.


### Ecosistema Fortigate, FortiAP, Fortiswitch y Forticloud

Opción 1: Enfoque en Arquitectura y Seguridad (Security-Driven Networking) - [Recomendada]

    Título: Seguridad Perimetral y Redes Empresariales (Ecosistema Fortinet)

    Descripción: Unificación de infraestructura y ciberseguridad. Diseñamos, desplegamos y administramos firewalls de siguiente generación (NGFW) FortiGate, segmentación LAN con FortiSwitch y redes inalámbricas seguras con FortiAP. Todo gestionado y monitoreado de manera centralizada a través de FortiCloud.

Opción 2: Enfoque en Rendimiento y Conectividad (Ideal para empresas con sucursales)

    Título: Redes Definidas por Software (SD-WAN) y Seguridad Avanzada

    Descripción: Optimización del tráfico crítico y protección de tu perímetro. Implementamos arquitecturas SD-WAN seguras con FortiGate, integrando switches y access points (FortiAP) para garantizar conectividad de alto rendimiento, prevención de intrusiones (IPS) y filtrado web en toda la organización.

Opción 3: Enfoque Integral (Gestión y Control Total)

    Título: Infraestructura de Red Segura y Gestión Centralizada

    Descripción: Control total sobre los accesos y el tráfico de tu empresa. Consolidamos tu red local (LAN) e inalámbrica (WLAN) bajo el ecosistema Fortinet, aplicando políticas de seguridad consistentes desde el perímetro hasta el endpoint, respaldado por la visibilidad en tiempo real de FortiCloud.


### Diseño e implementacion integral de redes de datos y Wifi 

Opción 1: Enfoque en Arquitectura y Alto Rendimiento (Recomendada)

    Título: Arquitectura Integral de Redes LAN y WLAN

    Descripción: Diseño e implementación de infraestructura de voz y datos de extremo a extremo. Desde el tendido físico y auditoría de enlaces, hasta la configuración de switches empresariales, segmentación por VLANs y despliegue de redes Wi-Fi de alta densidad con roaming sin interrupciones.

Opción 2: Enfoque Comercial (Espacios de trabajo modernos)

    Título: Conectividad Empresarial y Redes Wi-Fi Inteligentes

    Descripción: Soluciones de conectividad escalables diseñadas a la medida de tus instalaciones. Implementamos redes de datos estables y garantizamos cobertura inalámbrica total, eliminando zonas muertas y asegurando una transmisión rápida y segura para todos los dispositivos de tu organización.

Opción 3: Enfoque Técnico (Infraestructura Core)

    Título: Infraestructura de Datos y Redes Inalámbricas Corporativas

    Descripción: Despliegue de cableado estructurado y topologías de red optimizadas. Configuramos hardware de red y Access Points (APs) gestionados centralizadamente, asegurando el ancho de banda, la resiliencia de la red y el máximo rendimiento para tus operaciones diarias.
