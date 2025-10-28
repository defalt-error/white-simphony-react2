# White Symphony React

Aplicación frontend construida con React y Vite para una tienda de música/vinilos. Incluye autenticación de clientes y administradores, carrito de compras, filtrado por categorías y flujo de checkout.

## Tecnologías
- React 18
- Vite 5
- React Router 6
- Bootstrap 5
- Karma + Jasmine para pruebas unitarias

## Requisitos
- Node.js 18 o superior
- npm (incluido con Node)
- Google Chrome instalado (necesario para `karma-chrome-launcher`)

## Instalación
```bash
npm install
```

## Desarrollo
Arranca el servidor de desarrollo en `http://localhost:5173`:
```bash
npm run dev
```

## Build de producción
Genera el build optimizado en `dist/`:
```bash
npm run build
```

Previsualiza el build:
```bash
npm run preview
```

## Pruebas
Ejecuta las pruebas unitarias con Karma + Jasmine:
```bash
npm test
```

Notas:
- Asegúrate de tener Google Chrome instalado.
- El runner abre un navegador; cierra la ventana de pruebas cuando termines.

## Estructura del proyecto
- `src/`
  - `pages/`: páginas principales (Home, Login, Register, Admin, Checkout, etc.)
  - `components/`: componentes reutilizables (Navbar, ProductList, Cart, etc.)
  - `context/`: contextos (`AuthContext`, `CartContext`)
  - `utils/`: utilidades (autenticación, carrito)
  - `data/`: datos de productos de ejemplo
- `public/`: assets estáticos
- `docs/`: documentos del proyecto
- `vite.config.js`: configuración de Vite

## Scripts útiles
- `npm run dev`: servidor de desarrollo
- `npm run build`: build de producción
- `npm run preview`: previsualización del build
- `npm test`: ejecutar pruebas unitarias
- `npm run push:gh`: script opcional de push a GitHub (`scripts/push.js`)

## Configuración de rutas
La navegación está gestionada con `react-router-dom@6`. Revisa `src/App.jsx` y `src/pages/` para añadir/editar rutas.

## Autenticación y roles
- Clientes: flujo de login/registro, carrito, checkout.
- Admin: rutas protegidas mediante `RequireAdmin` y `AuthContext`.

## Contribuir
1. Crea una rama desde `main`.
2. Realiza cambios y añade pruebas cuando aplique.
3. Abre un Pull Request usando la plantilla en `.github/pull_request_template.md`.

## Licencia
Proyecto educativo/demostrativo.