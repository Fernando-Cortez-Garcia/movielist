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
