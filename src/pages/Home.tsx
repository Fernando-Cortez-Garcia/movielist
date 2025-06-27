import axios from "axios";
import { MovieCard } from "../components/MovieCard";
import { useMovieContext } from "../context/MovieContext";
import { Skeleton } from "@/components/ui/skeleton";
import { useFavorites } from "@/context/FavoritesContext";
import { Alert } from "@/components/ui/alert";
import { Navbar } from "../components/Navbar";
import { useEffect } from "react";

interface HomeProps {
  showFavorites?: boolean;
  onToggleFavorites?: () => void;
}

export const Home = ({ showFavorites, onToggleFavorites }: HomeProps) => {
  // Hooks y estados globales
  const {
    movies,
    setMovies,
    searchQuery,
    setSearchQuery,
    loading,
    setLoading,
    error,
    setError,
  } = useMovieContext();
  const { favorites } = useFavorites();

  // Función para buscar películas por título
  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      setError("Por favor ingresa un título");
      return;
    }
    setLoading(true);
    setError("");
    setSearchQuery(query);
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${query}`
      );
      if (res.data.Search) {
        setMovies(res.data.Search);
      } else {
        setError("No se encontraron películas");
        setMovies([]);
      }
    } catch (err) {
      setError("Error al buscar películas");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar recomendaciones aleatorias de un pool de películas top, ordenadas por valoración, cada vez que se recarga
  useEffect(() => {
    if (!searchQuery) {
      setLoading(true);
      setError("");
      // Pool de títulos populares
      const topTitles = [
        "Inception",
        "The Shawshank Redemption",
        "The Dark Knight",
        "Pulp Fiction",
        "Forrest Gump",
        "Interstellar",
        "Fight Club",
        "The Matrix",
        "Goodfellas",
        "The Godfather",
        "The Lord of the Rings: The Return of the King",
        "Gladiator",
        "Whiplash",
        "The Prestige",
        "Parasite",
        "Joker",
      ];
      // Seleccionar 8 aleatorias y luego tomar las 6 mejor valoradas
      const shuffled = topTitles.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 8);
      Promise.all(
        selected.map((title) =>
          axios.get(
            `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&t=${encodeURIComponent(
              title
            )}`
          )
        )
      )
        .then((responses) => {
          // Filtrar solo las que tengan imdbRating válido y ordenarlas por rating descendente
          const found = responses
            .map((r) => r.data)
            .filter(
              (m) => m && m.imdbID && m.imdbRating && m.imdbRating !== "N/A"
            )
            .sort((a, b) => Number(b.imdbRating) - Number(a.imdbRating));
          setMovies(found.slice(0, 6));
        })
        .catch(() => setError("No se pudieron cargar las recomendaciones"))
        .finally(() => setLoading(false));
    }
  }, [searchQuery, setMovies, setLoading, setError]);

  return (
    <>
      {/* Navbar con buscador y botón de favoritos */}
      <Navbar
        onSearch={searchMovies}
        searchQuery={searchQuery}
        onToggleFavorites={onToggleFavorites}
      />
      <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mx-auto">
            {/* Mensaje de error */}
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
                {error}
              </div>
            )}
            {/* Alerta si no hay favoritos */}
            {showFavorites && favorites.length === 0 && !loading && (
              <Alert variant="destructive" className="mb-6 text-center">
                No tienes películas favoritas aún. ¡Agrega algunas para verlas aquí!
              </Alert>
            )}
            {/* Skeletons de carga */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="w-full h-64 mb-4 rounded-xl" />
                    <Skeleton className="h-6 w-3/4 mb-2 rounded" />
                    <Skeleton className="h-4 w-1/2 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              // Grilla de películas o favoritos
              <>
                {!searchQuery && !showFavorites && (
                  <h2 className="text-2xl font-bold mb-6 text-center text-primary">
                    Top recomendaciones
                  </h2>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-3 gap-8 justify-center">
                  {(showFavorites ? favorites : movies).map((movie) => (
                    <div key={movie.imdbID} className="flex justify-center">
                      <div className="w-full max-w-2xl">
                        <MovieCard movie={movie} />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};