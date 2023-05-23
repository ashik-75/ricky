import { MovieType } from "../types/movie.types";
import MovieCard from "./MovieCard";

function MovieList({ movies }: { movies: MovieType[] }) {
  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {movies?.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </div>
  );
}

export default MovieList;
