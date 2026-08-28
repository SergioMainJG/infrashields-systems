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
- Nuevo componente reutilizable `partner-carousel` con 7 badges de texto: Fortinet, Acronis, Google Workspace, Azure, Grandstream, Yealink, Cisco.
- Reescritura del contenido de los 5 slides existentes de `ImageCarousel` para reflejar los 5 servicios: instalación física/digital de telefonía, cómputo, redes físicas y virtuales, conmutadores y grabadores, y sistemas de seguridad.
- Página Inicio: hero (`ImageCarousel` con el contenido reescrito) + `partner-carousel` debajo.
- Página Quienes somos: texto genérico/placeholder (misión, quiénes somos) claramente marcado como pendiente de reemplazo por el cliente.
- Página Nuestros productos: intro breve + `partner-carousel` reutilizado (mismo componente que Inicio, sin duplicar datos).
- Página Servicios: una sola página con 5 secciones/tarjetas, una por categoría de servicio.
- Página Contáctanos: información estática (teléfono, correo, dirección, horario) en placeholders, sin formulario funcional.
- Mantener el tema daisyUI `corporate` ya configurado en `src/styles.css`, sin cambios.

**Out of scope (for future specs):**

- Subpáginas individuales por servicio (ej. `/servicios/telefonia`).
- Formulario de contacto funcional (con backend/envío real).
- Logos reales (SVG/PNG) de las marcas partner — por ahora son badges de texto.
- Catálogo de líneas de producto (tarjetas de producto) en "Nuestros productos".
- Funcionalidad de cuenta de usuario o carrito de compras.
- Internacionalización (i18n) / soporte multi-idioma.
- SEO por página (meta tags, sitemap).

## Data model

```ts
// src/partner-carousel/partner-carousel.ts
export interface PartnerBadge {
  id: string;
  name: string;
  badgeClass: string; // modificador de badge daisyUI, p.ej. 'badge-primary'
}
```

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
- [ ] La ruta `/` muestra el hero carousel (5 slides con el nuevo contenido de servicios) seguido del carrusel de partners.
- [ ] Las rutas `/quienes-somos`, `/nuestros-productos`, `/servicios` y `/contactanos` cargan cada una su propio componente vía `loadComponent`.
- [ ] El header muestra el texto "Infrashield Systems" y ya no muestra buscador, "Acceso a cuenta" ni carrito.
- [ ] El nav superior tiene exactamente 5 items (Inicio, Quienes somos, Nuestros productos, Servicios, Contáctanos) y el item de la ruta activa se resalta visualmente.
- [ ] El sidebar de categorías de producto genéricas ya no aparece en ninguna página.
- [ ] El carrusel de partners muestra exactamente 7 badges: Fortinet, Acronis, Google Workspace, Azure, Grandstream, Yealink, Cisco.
- [ ] El mismo componente `partner-carousel` se usa tanto en Inicio como en Nuestros productos, sin duplicar el arreglo de datos.
- [ ] La página Servicios muestra 5 secciones/tarjetas, una por cada categoría de servicio.
- [ ] La página Contáctanos muestra teléfono, correo, dirección y horario como texto estático, sin `<form>` funcional.
- [ ] El tema daisyUI sigue siendo `corporate`, sin cambios en `src/styles.css`.
- [ ] Ninguna página muestra errores en la consola del navegador.

## Decisions

- **Sí:** rutas separadas con `loadComponent` en vez de página única con anclas. Más escalable con Angular Router y alineado con el patrón standalone del proyecto.
- **Sí:** Servicios como una sola página con 5 secciones, no subpáginas. Son categorías relacionadas; evita rutas anidadas prematuras.
- **No:** mantener buscador/cuenta/carrito del header. No hay funcionalidad de compra implementada; dejarlos sería UI muerta.
- **Sí:** "Nuestros productos" muestra marcas partner en vez del sidebar de categorías genéricas. El sidebar era contenido de e-commerce ajeno al nuevo enfoque de la empresa.
- **Sí:** badges de texto para el carrusel de partners, sin logos reales todavía. Evita usar assets de marca de terceros sin verificar licencias, y no bloquea el desarrollo esperando los archivos.
- **Sí:** Inicio es una página distinta de "Quienes somos", con "Inicio" como 5to item de nav. Evita mezclar el hero de servicios con la narrativa institucional de la empresa.
- **Sí:** el carrusel de partners vive solo en Inicio, no duplicado en Quienes somos. Un único lugar de prueba social en la portada.
- **Sí:** reescribir los 5 slides del `ImageCarousel` existente en vez de crear un componente nuevo. Reutiliza la lógica de autoplay/scroll-snap ya construida y probada.
- **No:** formulario de contacto funcional. No hay backend; se deja fuera para no prometer una funcionalidad que no envía nada.
- **No:** cambiar el tema daisyUI `corporate`. Instrucción explícita del usuario de no tocar el tema corporate.

## Risks

| Riesgo                                                                          | Mitigación                                                                                                          |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| El contenido placeholder se queda en producción sin reemplazar                   | Marcar claramente en el texto de cada página que es contenido genérico pendiente de reemplazo por el cliente.        |
| Nombres de marcas partner (Fortinet, Cisco, etc.) mostrados sin acuerdo verificado | Usar solo texto (sin logos) hasta confirmar que existe relación de partnership vigente y permiso de uso de marca.     |

## What is **not** in this spec

- Subpáginas individuales por servicio (`/servicios/telefonia`, etc.).
- Formulario de contacto funcional con backend.
- Logos reales de las marcas partner.
- Catálogo de líneas de producto en "Nuestros productos".
- Funcionalidad de cuenta de usuario o carrito de compras.
- Internacionalización / múltiples idiomas.

Cada uno de estos, si se implementa, va en su propio spec.
