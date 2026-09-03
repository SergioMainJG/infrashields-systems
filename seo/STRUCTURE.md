# Sitemap — estructura del sitio

Generado: 2026-08-19
Dominio: `https://infrashieldsys.com`

## URLs incluidas (5)

| Ruta | Página | Prioridad de contenido |
|---|---|---|
| `/` | Inicio (hero de servicios + carrusel de partners) | Alta |
| `/quienes-somos` | Quiénes somos, misión, visión | Alta |
| `/nuestros-productos` | Marcas partner | Media |
| `/servicios` | Telefonía, cómputo, redes, conmutadores/grabadores, seguridad | Alta |
| `/contactanos` | Teléfono, correo, horario | Media |

Todas las URLs devuelven 200 y están dentro del límite de 50,000 URLs / 50MB —
no se requiere sitemap index.

## Archivos generados

- `public/sitemap.xml` — se sirve en `https://infrashieldsys.com/sitemap.xml`
  (Angular copia todo `public/` a la raíz del build, ver `angular.json`).
- `public/robots.txt` — permite el crawling completo y declara el sitemap.

## Pendiente (fuera de este comando)

- Enviar el sitemap a Google Search Console una vez el dominio esté en
  producción (`claude-seo run` con las credenciales de Google, o manualmente).
- Actualizar `<lastmod>` cuando el contenido de cada página cambie de forma
  significativa (no en cada commit trivial).
- Si se agregan subpáginas por servicio (`/servicios/telefonia`, etc. — fuera
  de alcance del spec 01 actual), agregarlas aquí como nuevas entradas `<url>`.
