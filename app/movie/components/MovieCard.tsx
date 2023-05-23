import Image from "next/image";
import Link from "next/link";
import { MovieType } from "../types/movie.types";

const BASE_IMAGE_URL = `https://image.tmdb.org/t/p/w500`;

function MovieCard({ movie }: { movie: MovieType }) {
  return (
    <div>
      <Link href={`/movie/${movie.id}`}>
        <div className="relative w-full h-44">
          <Image
            fill
            src={`${BASE_IMAGE_URL}${movie.poster_path}`}
            alt={movie.poster_path}
            className="absolute w-full h-full object-cover object-top"
          />
        </div>
      </Link>
      <h1>{movie.original_title}</h1>
    </div>
  );
}

export default MovieCard;
