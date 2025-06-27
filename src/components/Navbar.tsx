import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { useFavorites } from "@/context/FavoritesContext";

export const Navbar = ({ onToggleFavorites, onSearch, searchQuery }: { onToggleFavorites?: () => void, onSearch?: (query: string) => void, searchQuery?: string }) => {
  const [showFavs, setShowFavs] = useState(false);
  const { favorites } = useFavorites();

  const handleFavClick = () => {
    setShowFavs((prev) => !prev);
    onToggleFavorites?.();
  };

  return (
    <nav className="w-full bg-background border-b shadow-sm mb-8 transition-colors h-24 flex items-center sticky top-0 z-30">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-4 h-full gap-4">
        {/* Título a la izquierda */}
        <div className="flex items-center h-full">
          <Link to="/" className="text-2xl font-bold text-primary dark:text-primary tracking-tight select-none mr-8">
            MovieList
          </Link>
        </div>
        {/* Buscador centrado vertical y horizontalmente */}
        <div className="flex-1 flex flex-col items-center justify-center h-full">
          {onSearch && (
            <div className="w-full max-w-xl flex flex-col items-center justify-center h-full">
              <SearchBar onSearch={onSearch} initialQuery={searchQuery} center />
            </div>
          )}
        </div>
        {/* Acciones a la derecha */}
        <div className="flex items-center gap-2 h-full relative">
          <button
            onClick={handleFavClick}
            aria-label="Ver favoritos"
            className={`rounded-full p-1 transition hover:scale-110 relative ${showFavs ? 'bg-pink-100 dark:bg-pink-900' : 'bg-white/80 dark:bg-zinc-900/80'}`}
          >
            {/* Contador de favoritos más arriba y a la derecha */}
            <span className="absolute -top-3 -right-3 bg-pink-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow z-20 min-w-6 text-center select-none border-2 border-background dark:border-zinc-900" style={{minWidth: 22}}>
              {favorites.length}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={showFavs ? "#e11d48" : "none"}
              viewBox="0 0 24 24"
              stroke="#e11d48"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12.76 3.64l.24.26.24-.26C14.59 2.09 16.26 1.5 18 1.5c3.04 0 5.5 2.46 5.5 5.5 0 4.28-3.4 7.36-8.55 12.04L12 21.35l-2.95-2.68C4.4 14.36 1 11.28 1 7.5 1 4.46 3.46 2 6.5 2c1.74 0 3.41 0.81 4.5 2.09z"
              />
            </svg>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};
