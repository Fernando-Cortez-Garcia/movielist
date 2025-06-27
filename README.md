# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

# MovieList 🎬

Aplicación web para buscar y explorar películas usando la API de OMDb. Incluye detalles, favoritos, modo oscuro, animaciones y más.

## Tecnologías y librerías utilizadas

- **React** + **TypeScript**: Desarrollo de interfaces modernas y tipadas.
- **Vite**: Bundler ultrarrápido para desarrollo y build.
- **TailwindCSS**: Utilidades CSS para estilos responsivos y modo oscuro.
- **shadcn/ui**: Componentes UI modernos y accesibles (Card, Button, Input, Skeleton, Dropdown, ThemeToggle, etc).
- **Framer Motion**: Animaciones suaves en las tarjetas de películas.
- **Axios**: Peticiones HTTP a la API de OMDb.
- **React Context**: Manejo global de estado para películas, favoritos y búsqueda.
- **LocalStorage**: Persistencia de favoritos en el navegador.

## Características principales

- **Búsqueda de películas** por título usando la API de OMDb.
- **Vista de detalles** de cada película con información extendida.
- **Favoritos**: guarda y consulta tus películas favoritas (persistente).
- **Modo oscuro**: alterna entre claro y oscuro con un solo clic.
- **Animaciones**: tarjetas animadas al aparecer y al hacer hover.
- **Películas relacionadas**: muestra recomendaciones según el género.
- **UI moderna y responsiva**: diseño adaptable a cualquier dispositivo.

## Estructura del proyecto

- `/src/components`: Componentes reutilizables (MovieCard, SearchBar, Navbar, ThemeToggle, etc).
- `/src/pages`: Vistas principales (Home, MovieDetail).
- `/src/context`: Contextos globales (MovieContext, FavoritesContext).

---