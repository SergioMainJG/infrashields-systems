# Infrashield Systems

Sitio corporativo de **Infrashield Systems**, empresa mexicana de infraestructura de TI: telefonía, cómputo, redes, conmutadores y grabadores, y ciberseguridad.

**En producción:** https://infrashieldsys.com

![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![daisyUI](https://img.shields.io/badge/daisyUI-5-5A0EF8?logo=daisyui&logoColor=white)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-en_producción-F38020?logo=cloudflarepages&logoColor=white)

![Página de inicio de Infrashield Systems](docs/inicio.png)

## Contexto

- **Cliente:** Infrashield Systems (México)
- **Tipo:** proyecto para cliente, en producción
- **Mi rol:** desarrollo frontend, SEO técnico y despliegue
- **Periodo:** agosto – septiembre 2026

El sitio presenta los servicios de la empresa y sus alianzas con fabricantes como Acronis, Kaspersky, Fortinet, Microsoft y Cisco.

## Funcionalidades

- **5 páginas con lazy loading:** Inicio, Quiénes somos, Nuestros productos, Servicios y Contáctanos.
- **Precarga en segundo plano** (`PreloadAllModules`): cada ruta se carga bajo demanda y después se precarga cuando la app está inactiva, así la navegación entre páginas es inmediata.
- **Carrusel de servicios propio, sin librerías:** estado con signals, autoplay que se pausa al pasar el mouse, navegación con scroll-snap y atributos ARIA para lectores de pantalla.
- **Carrusel de partners** con `NgOptimizedImage`. Si una marca todavía no tiene logo, se muestra como texto.
- **SEO técnico:** título por ruta, meta description, `sitemap.xml` y `robots.txt`.

## Stack

| Área      | Tecnología                                                                                   |
| --------- | -------------------------------------------------------------------------------------------- |
| Framework | Angular 22: componentes standalone (sin NgModules) y signals                                 |
| Estilos   | Tailwind CSS v4 + daisyUI 5, con el tema `corporate` personalizado                           |
| Lenguaje  | TypeScript 6 con checks adicionales (`noImplicitReturns`, `noImplicitOverride`, entre otros) |
| Formato   | oxfmt + Prettier                                                                             |
| Hosting   | Cloudflare Pages                                                                             |
| Paquetes  | pnpm                                                                                         |

## Estructura

```
src/
├── app/
│   ├── pages/            # Una carpeta por ruta, cargadas con lazy loading
│   ├── navbar-menu/
│   ├── footer/
│   ├── logo/
│   ├── app.routes.ts     # Rutas y títulos por página
│   └── app.config.ts     # Router con precarga
├── image-carousel/       # Carrusel de servicios
├── partner-carousel/     # Logos de partners
└── styles.css            # Tailwind + tema de daisyUI
public/                   # favicon, logo, robots.txt, sitemap.xml
```

## Desarrollo local

Requisitos: Node.js 24.19 o superior y pnpm 11.24.

```bash
pnpm install
pnpm start    # http://localhost:4200
pnpm build    # genera dist/infrashield-systems/browser/
```

## Despliegue

Build estático en Cloudflare Pages. La configuración está en `wrangler.toml`.

```bash
pnpm build
pnpm dlx wrangler pages deploy
```

## Créditos

Desarrollado por [Sergio Arce](https://github.com/SergioMainJG).

La marca, los textos y el logotipo son propiedad de Infrashield Systems. Los logos de Acronis, Kaspersky y las demás marcas pertenecen a sus respectivos dueños. Las fotografías provienen de [Unsplash](https://unsplash.com).

El código se publica como muestra de portafolio con autorización del cliente y no incluye licencia de uso.