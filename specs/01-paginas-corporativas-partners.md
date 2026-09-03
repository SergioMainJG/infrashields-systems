# SPEC 01 — Páginas corporativas y carrusel de partners

> **Status:** Approved
> **Depends on:** Ninguno
> **Date:** 2026-08-19
> **Objective:** Reestructurar el sitio como plantilla corporativa de Infrashield Systems con navegación en 5 páginas (Inicio, Quienes somos, Nuestros productos, Servicios, Contáctanos) y un carrusel de partnership con las marcas Fortinet, Acronis, Google Workspace, Azure, Grandstream, Yealink y Cisco.

## Scope

**In:**

- Reestructuración de rutas Angular con `loadComponent` (lazy, standalone): `/` (Inicio), `/quienes-somos`, `/nuestros-productos`, `/servicios`, `/contactanos`.
- Rebrand del header: texto "Infrashield Systems" en lugar de "abasteo:".
- Remoción del buscador, el botón "Acceso a cuenta" y el carrito de compras del header (no hay funcionalidad de e-commerce implementada).
- Remoción del sidebar de categorías de producto genéricas.
- Nav superior con 5 items (Inicio, Quienes somos, Nuestros productos, Servicios, Contáctanos) enlazados con `routerLink`, con estado activo vía `routerLinkActive`.
- Nuevo componente reutilizable `partner-carousel` con carrusel de logos reales (imágenes en `src/assets/`, servidas vía `NgOptimizedImage`) de las marcas partner; solo se listan las marcas cuyo archivo de logo ya existe (por ahora, Acronis).
- Reescritura del contenido de los 5 slides existentes de `ImageCarousel` para reflejar los 5 servicios: instalación física/digital de telefonía, cómputo, redes físicas y virtuales, conmutadores y grabadores, y sistemas de seguridad.
- Página Inicio: hero (`ImageCarousel` con el contenido reescrito) + `partner-carousel`, en layout responsivo — barra superior (apilado) en pantallas pequeñas, sidebar izquierdo en pantallas grandes (`lg:`).
- Página Quienes somos: texto genérico/placeholder (misión, quiénes somos) claramente marcado como pendiente de reemplazo por el cliente.
- Página Nuestros productos: intro breve + `partner-carousel` reutilizado (mismo componente que Inicio, sin duplicar datos).
- Página Servicios: una sola página con 5 secciones/tarjetas, una por categoría de servicio.
- Página Contáctanos: información estática (teléfono, correo, dirección, horario) en placeholders, sin formulario funcional.
- Mantener el tema daisyUI `corporate` ya configurado en `src/styles.css`, sin cambios.
- Título de documento (`<title>`) y meta description por ruta, vía el campo `title` de `Routes` y el servicio `Meta` de `@angular/platform-browser` en cada componente de página.
- Accesibilidad de navegación: `aria-label` en el `<nav>` principal y `ariaCurrentWhenActive="page"` en cada link del nav (input nativo de `RouterLinkActive`).
- Uso de etiquetas HTML semánticas (`header`, `article`, `address`, `ul`/`li`, `span`) en vez de `div` genéricos donde el contenido tiene un rol claro, para mejorar el árbol de accesibilidad/SEO.
- `public/sitemap.xml` y `public/robots.txt` con dominio `https://infrashieldsys.com`, cubriendo las 5 rutas del sitio.
- Componente `app-footer` (`src/app/footer/`), minimalista (solo marca + copyright, sin navegación ni datos de contacto duplicados — eso ya vive en Contáctanos y en el nav), persistente en el shell de `App` en las 5 páginas, con patrón "sticky footer" (flexbox: `main` con `flex-1`) para que quede anclado al fondo del viewport cuando el contenido de la página es corto (ej. Inicio).

**Out of scope (for future specs):**

- Subpáginas individuales por servicio (ej. `/servicios/telefonia`).
- Formulario de contacto funcional (con backend/envío real).
- Catálogo de líneas de producto (tarjetas de producto) en "Nuestros productos".
- Funcionalidad de cuenta de usuario o carrito de compras.
- Internacionalización (i18n) / soporte multi-idioma.
- Server-side rendering (SSR) — el `<title>`/meta description por ruta se actualizan client-side, no en el HTML servido inicialmente.
- Envío del sitemap a Google Search Console (requiere el dominio en producción).

## Data model

```ts
// src/partner-carousel/partner-carousel.ts
export interface PartnerLogo {
  id: string;
  name: string;
  image: string; // ruta servida desde /assets (src/assets/, ver angular.json)
  width: number;
  height: number;
}
```

`src/assets/` se sirve como assets estáticos bajo `/assets` (entrada agregada en `angular.json`, junto a `public/`). Solo se agrega una entrada a `PartnerCarousel.partners` cuando el archivo de logo correspondiente ya existe en `src/assets/`.

`CarouselSlide` (definida en `src/image-carousel/image-carousel.ts`) no cambia de forma — solo cambian los 5 valores de sus campos (`tag`, `title`, `subtitle`, `description`, `ctaText`) para reflejar los nuevos servicios en vez de los productos genéricos actuales.

Convenciones:

- Los datos del carrusel de partners viven como arreglo estático dentro de `PartnerCarousel`, igual que `ImageCarousel.slides` — sin servicio ni backend.
- Las rutas usan `loadComponent` (sin `NgModule`), siguiendo el patrón standalone ya usado en `app.config.ts`.

## Implementation plan

1. Crear los 5 componentes de página vacíos (`src/app/pages/home/`, `quienes-somos/`, `nuestros-productos/`, `servicios/`, `contactanos/`, cada uno con `<slug>.ts` + `<slug>.html`, selector `app-<slug>`) con un `<h1>` de marcador de posición. Actualizar `src/app/app.routes.ts` con las 5 rutas vía `loadComponent`. Actualizar `src/app/app.ts`/`app.html` para renderizar `<router-outlet>` donde hoy está el `<main>` hardcodeado. Prueba manual: `pnpm start`, navegar a cada URL directamente, confirmar que cada marcador renderiza sin errores de consola.
2. En `src/app/app.html`, reemplazar el texto de marca "abasteo:" por "Infrashield Systems"; eliminar el dropdown "Contáctenos", el buscador, el botón "Acceso a cuenta", el botón de carrito y el `<aside>` de categorías. Prueba manual: el header muestra solo la marca; sin errores de consola ni contenedores vacíos huérfanos.
3. Reemplazar los items del `<ul>` de nav (Configuradores, Servicios, Licencias en la nube, Soluciones Cloud, E-Procurement) por los 5 nuevos (Inicio, Quienes somos, Nuestros productos, Servicios, Contáctanos) usando `routerLink` y `routerLinkActive`. Prueba manual: click en cada item navega a la ruta correcta y la resalta como activa; `pnpm build` sin errores.
4. Crear `src/partner-carousel/partner-carousel.ts` + `.html`: componente standalone, selector `partner-carousel`, arreglo estático de 7 `PartnerBadge` (Fortinet, Acronis, Google Workspace, Azure, Grandstream, Yealink, Cisco) renderizados como badges daisyUI dentro de un contenedor `carousel` (reutilizando las clases visuales de `ImageCarousel`, sin autoplay ni señales de estado — es una fila estática). Prueba manual: colocarlo temporalmente en Home y confirmar que los 7 badges se ven y hacen scroll en viewport angosto.
5. Reescribir los 5 `CarouselSlide` en `src/image-carousel/image-carousel.ts` con el contenido de telefonía, cómputo, redes físicas y virtuales, conmutadores y grabadores, y seguridad. Completar `src/app/pages/home/home.html` con `<image-carousel>` seguido de `<partner-carousel>`. Prueba manual: `/` muestra el hero con el contenido nuevo y el carrusel de partners debajo; el autoplay del hero sigue funcionando.
6. Completar `src/app/pages/quienes-somos/quienes-somos.html` con texto genérico placeholder (quiénes somos, misión) marcado como pendiente de reemplazo. Prueba manual: la página renderiza sin errores; el nav resalta "Quienes somos".
7. Completar `src/app/pages/nuestros-productos/nuestros-productos.html` con un párrafo de intro breve + `<partner-carousel>`. Prueba manual: los mismos 7 badges se ven aquí y en Home, sin duplicar el arreglo de datos.
8. Completar `src/app/pages/servicios/servicios.html` con 5 tarjetas/secciones (telefonía, cómputo, redes físicas y virtuales, conmutadores y grabadores, seguridad), cada una con título y descripción genérica de instalación física/digital. Completar `src/app/pages/contactanos/contactanos.html` con teléfono, correo, dirección y horario placeholder. Prueba manual: ambas páginas renderizan, el nav resalta correctamente, `pnpm build` sin errores de TypeScript.

## Acceptance criteria

- [ ] `pnpm build` termina sin errores.
- [ ] La ruta `/` muestra el hero carousel (5 slides con el nuevo contenido de servicios) junto con el carrusel de partners, como barra superior en pantallas pequeñas y como sidebar izquierdo en pantallas grandes (`lg:`).
- [ ] Las rutas `/quienes-somos`, `/nuestros-productos`, `/servicios` y `/contactanos` cargan cada una su propio componente vía `loadComponent`.
- [ ] El header muestra el texto "Infrashield Systems" y ya no muestra buscador, "Acceso a cuenta" ni carrito.
- [ ] El nav superior tiene exactamente 5 items (Inicio, Quienes somos, Nuestros productos, Servicios, Contáctanos) y el item de la ruta activa se resalta visualmente.
- [ ] El sidebar de categorías de producto genéricas ya no aparece en ninguna página.
- [ ] El carrusel de partners muestra el logo real (imagen) de cada marca cuyo archivo ya existe en `src/assets/`, servido vía `NgOptimizedImage`.
- [ ] El mismo componente `partner-carousel` se usa tanto en Inicio como en Nuestros productos, sin duplicar el arreglo de datos.
- [ ] La página Servicios muestra 5 secciones/tarjetas, una por cada categoría de servicio.
- [ ] La página Contáctanos muestra teléfono, correo, dirección y horario como texto estático, sin `<form>` funcional.
- [ ] El tema daisyUI sigue siendo `corporate`, sin cambios en `src/styles.css`.
- [ ] Ninguna página muestra errores en la consola del navegador.
- [ ] Cada ruta actualiza el `<title>` del documento y su meta description al navegar.
- [ ] El link del nav correspondiente a la ruta activa tiene `aria-current="page"`.

## Decisions

- **Sí:** rutas separadas con `loadComponent` en vez de página única con anclas. Más escalable con Angular Router y alineado con el patrón standalone del proyecto.
- **Sí:** Servicios como una sola página con 5 secciones, no subpáginas. Son categorías relacionadas; evita rutas anidadas prematuras.
- **No:** mantener buscador/cuenta/carrito del header. No hay funcionalidad de compra implementada; dejarlos sería UI muerta.
- **Sí:** "Nuestros productos" muestra marcas partner en vez del sidebar de categorías genéricas. El sidebar era contenido de e-commerce ajeno al nuevo enfoque de la empresa.
- **Sí:** logos reales de las marcas partner vía `NgOptimizedImage`, mostrando solo las marcas cuyo archivo ya existe en `src/assets/` (decisión revisada — el usuario proveerá los logos incrementalmente).
- **Sí:** Inicio es una página distinta de "Quienes somos", con "Inicio" como 5to item de nav. Evita mezclar el hero de servicios con la narrativa institucional de la empresa.
- **Sí:** el carrusel de partners vive solo en Inicio, no duplicado en Quienes somos. Un único lugar de prueba social en la portada.
- **Sí:** reescribir los 5 slides del `ImageCarousel` existente en vez de crear un componente nuevo. Reutiliza la lógica de autoplay/scroll-snap ya construida y probada.
- **No:** formulario de contacto funcional. No hay backend; se deja fuera para no prometer una funcionalidad que no envía nada.
- **No:** cambiar el tema daisyUI `corporate`. Instrucción explícita del usuario de no tocar el tema corporate.
- **No:** usar `@angular/aria` para accesibilidad general. Ese paquete cubre patrones de widgets interactivos complejos (accordion, listbox, combobox, menu, tabs, tree, grid) que no existen en este sitio; forzar, por ejemplo, roles de `menu` sobre la navegación del sitio es un antipatrón de ARIA. Se usan en su lugar las APIs nativas correctas: `title` en `Routes`, `Meta` de `@angular/platform-browser`, y `ariaCurrentWhenActive` de `RouterLinkActive`.

## Risks

| Riesgo                                                                          | Mitigación                                                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| El contenido placeholder se queda en producción sin reemplazar                   | Marcar claramente en el texto de cada página que es contenido genérico pendiente de reemplazo por el cliente.        |
| Logos de marcas partner mostrados sin acuerdo de partnership verificado | Solo se agrega un logo al carrusel cuando el usuario coloca el archivo en `src/assets/`, confirmando así que existe relación de partnership vigente y permiso de uso de marca. |

## What is **not** in this spec

- Subpáginas individuales por servicio (`/servicios/telefonia`, etc.).
- Formulario de contacto funcional con backend.
- Catálogo de líneas de producto en "Nuestros productos".
- Funcionalidad de cuenta de usuario o carrito de compras.
- Internacionalización / múltiples idiomas.

Cada uno de estos, si se implementa, va en su propio spec.
