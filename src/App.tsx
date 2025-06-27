import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Home } from "./pages/Home";
import { MovieDetail } from "./pages/MovieDetail";
import { MovieProvider } from "./context/MovieContext";
import { FavoritesProvider } from "./context/FavoritesContext";

export const App = () => {
  // Estado global para alternar la vista de favoritos
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    // Proveedores de contexto para películas y favoritos
    <FavoritesProvider>
      <MovieProvider>
        <Router>
          {/* Definición de rutas principales */}
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  showFavorites={showFavorites}
                  onToggleFavorites={() => setShowFavorites((prev) => !prev)}
                />
              }
            />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </Router>
      </MovieProvider>
    </FavoritesProvider>
  );
};