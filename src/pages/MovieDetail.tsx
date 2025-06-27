import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";

interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
}

export const MovieDetail = () => {
  // Obtiene el id de la película desde la URL
  const { id } = useParams<{ id: string }>();
  // Estados para la película y relacionadas
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [related, setRelated] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingRelated, setLoadingRelated] = useState(false);

  // Efecto para obtener los detalles de la película
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&i=${id}`
        );
        setMovie(res.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // Efecto para buscar películas relacionadas por género
  useEffect(() => {
    if (!movie) return;
    const fetchRelated = async () => {
      setLoadingRelated(true);
      try {
        // Buscar por el primer género de la película
        const genre = movie.Genre?.split(",")[0] || movie.Title.split(" ")[0];
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${genre}&type=movie&page=1`
        );
        if (res.data.Search) {
          // Excluir la película actual de los resultados
          setRelated(res.data.Search.filter((m: any) => m.imdbID !== id).slice(0, 8));
        } else {
          setRelated([]);
        }
      } catch {
        setRelated([]);
      } finally {
        setLoadingRelated(false);
      }
    };
    fetchRelated();
  }, [movie, id]);

  // Skeleton de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors">
        <div className="max-w-4xl mx-auto bg-card text-card-foreground rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Skeleton className="h-96 w-full md:w-80" />
            </div>
            <div className="p-8 flex-1 space-y-4">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-5 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-10 w-40 mt-8" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si no se encuentra la película
  if (!movie) {
    return <div className="text-center py-20">Película no encontrada</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto bg-card text-card-foreground rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-96 w-full object-cover md:w-80"
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-movie.jpg"}
              alt={movie.Title}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-primary font-semibold">
              {movie.Year} • {movie.Runtime}
            </div>
            <h1 className="block mt-1 text-2xl font-bold text-foreground dark:text-foreground">
              {movie.Title}
            </h1>
            <div className="mt-2">
              <span className="text-muted-foreground">Director: </span>
              <span>{movie.Director}</span>
            </div>
            <div className="mt-4">
              <h2 className="text-lg font-semibold">Sinopsis</h2>
              <p className="mt-2 text-muted-foreground">{movie.Plot}</p>
            </div>
            {/* Calificación IMDb con estrellas */}
            <div className="mt-6 flex items-center gap-2">
              <span className="font-semibold">Calificación IMDb:</span>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => {
                  const rating = Number(movie.imdbRating) / 2;
                  const filled = i + 1 <= Math.floor(rating);
                  const half = !filled && i + 0.5 < rating;
                  return (
                    <svg
                      key={i}
                      className="w-6 h-6 text-yellow-400"
                      fill={filled ? "currentColor" : half ? "url(#half)" : "none"}
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <defs>
                        <linearGradient id="half">
                          <stop offset="50%" stopColor="currentColor" />
                          <stop offset="50%" stopColor="transparent" />
                        </linearGradient>
                      </defs>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      />
                    </svg>
                  );
                })}
                <span className="ml-2 text-sm text-muted-foreground">({movie.imdbRating}/10)</span>
              </div>
            </div>
            {/* Botón para volver al buscador */}
            <Button
              asChild
              variant="default"
              className="mt-8 bg-black text-white hover:bg-zinc-900 transition-colors"
            >
              <Link to="/">Volver al buscador</Link>
            </Button>
          </div>
        </div>
      </div>
      {/* Sección de películas relacionadas */}
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">Te puede interesar</h2>
        {loadingRelated ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-full flex justify-center items-center">
                <Skeleton className="w-56 h-[340px] rounded-xl mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2 rounded" />
              </div>
            ))}
          </div>
        ) : related.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {related.map((rel) => (
              <div key={rel.imdbID} className="flex justify-center items-center">
                <div className="w-56">
                  <MovieCard movie={rel} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No se encontraron relacionadas.</p>
        )}
      </div>
    </div>
  );
};