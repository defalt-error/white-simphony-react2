## Título

Subida trabajo personalizado v6 (White Simphony React)

## Resumen

Este PR incorpora el trabajo personalizado v6 de la aplicación White Simphony React.
Incluye estructura de proyecto con Vite + React, páginas, componentes, assets y tests básicos
para utilidades.

## Cambios principales

- Añadido `.gitignore` estándar para Node/Vite/React.
- Código fuente ubicado en `src/` con páginas: Home, Categorías, Carrito, Checkout, Login, Admin.
- Componentes principales: Header, Navbar, ProductList, ProductCard, Cart, SearchBar, Footer.
- Assets de imágenes en `public/imagenes/`.
- Configuración de Vite en `vite.config.js`.
- Pruebas y configuración de test (`src/__tests__/`, `karma.conf.cjs`).

## Alcance

- Solo frontend. No se modifican pipelines ni servicios externos.

## Cómo probar

1) Instala dependencias: `npm install`.
2) Levanta dev server: `npm run dev`.
3) Navega por: Home, Categorías, Carrito y Checkout.
4) (Opcional) Ejecuta pruebas: `npm test`.

## Checklist

- [ ] Descripción del PR es clara y completa.
- [ ] La rama base es la correcta (`main` o `master`).
- [ ] Build y dev server funcionan (`npm install`, `npm run dev`).
- [ ] No se incluyen archivos sensibles (`.env`, credenciales).
- [ ] Assets optimizados y paths correctos.
- [ ] Se verifican secciones clave: Home, Categorías, Carrito, Checkout.

## Notas

- Se configuró identidad local de Git para el commit inicial.
- Advertencias de fin de línea LF→CRLF en Windows son esperadas y no afectan ejecución.