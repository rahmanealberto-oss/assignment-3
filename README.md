# Intercambio de Bienes

Plataforma de trueque comunitario: publica un artículo que ya no usas, explora lo que ofrece tu comunidad y acuerda el intercambio directamente con la otra persona — sin dinero, sin cuentas, sin backend.

- **Repositorio:** github.com/rahmanealberto-oss/assignment-3
- **Documento de planeación (5 secciones):** `Intercambio_de_Bienes_Documento_Planeacion.pdf`

Este README es la bitácora del proyecto: documentación técnica, los prompts principales usados con la IA (Claude) durante el desarrollo, y una autoevaluación.

---

## 1. Documentación técnica del stack

| Herramienta | Uso | Por qué se eligió |
|---|---|---|
| **Next.js 16 (App Router)** + **TypeScript** | Framework y enrutamiento por archivos | Enrutamiento basado en carpetas simplifica las 3 páginas del proyecto; TypeScript redujo errores al iterar el modelo de datos varias veces. |
| **React `useSyncExternalStore`** | Sincronizar la UI con `localStorage` | Hook nativo pensado exactamente para suscribirse a una fuente de datos externa; da reactividad entre pestañas sin librerías de estado (Redux/Zustand) que el proyecto no necesita. |
| **Tailwind CSS v4** (tokens vía variables CSS) | Sistema de diseño | Permitió rehacer la dirección visual completa varias veces (minimalista → editorial → futurista → dashboard) cambiando solo los tokens de color en `globals.css`, sin reescribir componentes. |
| **`localStorage`, sin backend** | Persistencia de datos | Decisión de alcance: cumple el requisito de "sin backend, sin pagos" y evita la complejidad de una base de datos/API para una demo de un solo dispositivo. |
| **`next/font`** (Plus Jakarta Sans) | Tipografía | Autoalojada, sin llamadas externas en tiempo de ejecución. |
| **Git + GitHub + Vercel** | Control de versiones y despliegue | Cada `git push` a `main` puede disparar un deploy automático en Vercel una vez conectado el repositorio. |
| **ESLint** | Calidad de código | Se corrió antes de cada entrega para evitar errores silenciosos. |

**Arquitectura del proyecto** (máximo 5 componentes reutilizables, según el alcance definido):

```
app/
  page.tsx                 → Inicio: hero, tendencias, catálogo con buscador
  publicar/page.tsx        → Formulario para publicar un artículo
  articulo/[id]/page.tsx   → Detalle de un artículo
  layout.tsx               → Sidebar + estructura global
  globals.css              → Sistema de diseño (tokens de color, sombras, animaciones)
components/
  Navbar.tsx    → Sidebar (escritorio) / barra superior (móvil)
  Button.tsx    → Botón primario/secundario reutilizable
  ItemForm.tsx  → Formulario de publicación
  ItemCard.tsx  → Tarjeta de artículo
  ItemList.tsx  → Grid de tarjetas + estado vacío
lib/
  items.ts       → CRUD sobre localStorage, semilla, vistas, tendencias
  categories.ts  → Metadata y gradientes por categoría
  types.ts       → Tipos (Item, NewItem, CategoryValue)
```

---

## 2. Bitácora — prompts principales usados con la IA

El desarrollo fue iterativo: cada fase partió de retroalimentación directa sobre lo construido en la fase anterior.

**Fase 1 — MVP funcional.**
> "regresando a la aplicacion de intercambio de bienes, creala y hazla funcional"

Resultado: las 3 páginas conectadas a `localStorage`, formulario de publicación, listado y detalle funcionando de punta a punta.

**Fase 2 — Datos de ejemplo y tendencias.**
> "2 y 3, ademas de los bienes en tendencia que mas se estan intercambiando"

Se agregó semilla de datos inicial, contador de vistas por artículo y una sección de "Tendencias" ordenada por popularidad.

**Fase 3 — Limpieza de contenido.**
> "quita los emjis. me parece buena estructura pero parece muy basica y formato que te da la AI. analiza como son las paginas web [...] considera si le cambiarias el nombre de bien a otra cosa"

Se quitaron los emojis, se renombró "bien" → "artículo" en toda la interfaz, y se corrigió que la tipografía cargada (Geist) nunca se estaba aplicando realmente al `<body>`.

**Fase 4 — Rediseño editorial.**
> "no me gusta [...] me gusta mas algo asi: [...] diseñador web [...] editorial. [...] tipografía Serif para titulares [...] Sans-Serif para párrafos"

Paleta negro/crema/terracota, tipografía Playfair Display + Inter, collage de imágenes en movimiento (marquee) en el hero.

**Fase 5 — Exploración de modelo de negocio** *(ejercicio paralelo, no forma parte de la entrega final)*.
> "te doy el rol de ser un estudiante de harvard que no le gusto el tema de intercambio de bienes y crees que lo podiras cambiar a algo [...] con mas oportunidad"

Se evaluaron y descartaron tres ideas de negocio distintas (marketplace de renta, reventa de devoluciones de e-commerce, infraestructura de agua industrial) antes de converger en una cuarta ("Nortia", inteligencia de sitio para nearshoring) que quedó pausada porque la entrega requerida era específicamente Intercambio de Bienes:
> "ok me gusta mucho, primero termina la pagina de intercambio de bienes porque es para una tarea y luego continuamos con esto"

**Fase 6 — Documento de planeación.** Se generó el PDF de 2 páginas con las 5 secciones requeridas (problema y alcance, etapas, pseudocódigo, stack, criterios de éxito), basado en el trabajo real ya hecho.

**Fase 7 — Rediseño dashboard.**
> "agrega un diseño moderno y premium. Usa un layout tipo dashboard con sidebar izquierdo, tipografía sans-serif redondeada, paleta de colores oscura con acentos en gradiente [...] Que se sienta como una mezcla entre Linear y Vercel"

Layout con sidebar fijo, tipografía Plus Jakarta Sans, sombras suaves con elevación al hover, microanimaciones en botones.

**Fase 8 — Ajuste final de paleta.**
> "no me gustan las cobras moradas y quisiera un poco de blanco hueso"

Se quitó el violeta/fucsia/índigo de toda la paleta y categorías, dejando un acento único en azul; el texto principal y el botón primario pasaron a un blanco hueso cálido.

**Fase 9 — Despliegue.** `git push` a GitHub en cada iteración relevante; conexión del repositorio a Vercel para deploy automático.

---

## 3. Autoevaluación

**Qué funcionó bien:** la arquitectura basada en `localStorage` + `useSyncExternalStore` resultó lo bastante flexible para sostener cinco direcciones visuales distintas sin tocar la lógica de datos, y el sistema de tokens de Tailwind permitió iterar el diseño rápido sin reescribir componentes cada vez. El resultado final cumple los tres requisitos técnicos originales (3 páginas, 5 componentes reutilizables, sin backend/pagos) y quedó desplegado públicamente con integración continua.

**Qué fue difícil:** el proceso incluyó una desviación real — la Fase 5, donde se exploró reemplazar todo el concepto de negocio antes de confirmar que la tarea exigía específicamente "Intercambio de Bienes". Eso significó retroceder y reconstruir el modelo de datos y las páginas de vuelta al trueque, con el costo de tiempo que implica. Una lección concreta: confirmar el alcance exacto de la entrega *antes* de invertir tiempo en exploraciones creativas paralelas, no después.

**Qué se haría distinto:** definir la dirección visual final (paleta, tipografía, layout) desde una fase más temprana habría evitado rehacer el sistema de diseño cuatro veces. Aun así, cada iteración fue una respuesta directa a retroalimentación específica, no cambios arbitrarios — el costo de las vueltas se compensó con un resultado final más ajustado a lo que realmente se quería.

**Aprendizaje principal:** trabajar con retroalimentación iterativa y específica (en vez de instrucciones vagas) acelera mucho la convergencia hacia un resultado satisfactorio, tanto en decisiones de diseño como de producto.
