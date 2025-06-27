import { Link } from "react-router-dom";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useFavorites } from "@/context/FavoritesContext";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export const MovieCard = ({ movie }: { movie: Movie }) => {
  // Hook para manejar favoritos
  const { isFavorite, toggleFavorite } = useFavorites();
  // Determina si la película está en favoritos
  const fav = isFavorite(movie.imdbID);

  return (
    // Card animada con framer-motion
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.03, boxShadow: "0 8px 32px 0 rgba(0,0,0,0.12)" }}
      className="h-full relative"
    >
      {/* Botón de favoritos (corazón) */}
      <button
        onClick={(e) => {
          e.preventDefault(); // Evita navegación al hacer click
          toggleFavorite(movie); // Agrega o quita de favoritos
        }}
        className="absolute top-2 right-2 z-10 bg-white/80 dark:bg-zinc-900/80 rounded-full p-1 shadow hover:scale-110 transition"
        aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        {fav ? (
          // Corazón lleno si es favorito
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#e11d48"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ) : (
          // Corazón vacío si no es favorito
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
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
        )}
      </button>
      {/* Card visual y link a detalle */}
      <Link to={`/movie/${movie.imdbID}`} className="block h-full">
        <Card className="overflow-hidden flex flex-col h-full transition-shadow hover:shadow-lg bg-card text-card-foreground dark:bg-card dark:text-card-foreground text-lg md:text-xl" style={{ minHeight: 420 }}>
          <div className="w-full aspect-[2/3] bg-muted dark:bg-muted flex items-center justify-center" style={{ minHeight: 340 }}>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "/placeholder-movie.jpg"
              }
              alt={movie.Title}
              className="w-full h-full object-cover object-center rounded-lg"
              loading="lazy"
              style={{ minHeight: 340 }}
            />
          </div>
          <CardContent className="flex-1 flex flex-col justify-between pt-4 pb-3 px-4">
            {/* Título de la película */}
            <CardTitle
              className="truncate text-lg md:text-2xl mb-1 font-bold"
              title={movie.Title}
            >
              {movie.Title}
            </CardTitle>
            {/* Año de la película */}
            <p className="text-muted-foreground text-base md:text-lg font-medium truncate dark:text-muted-foreground">
              {movie.Year}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};