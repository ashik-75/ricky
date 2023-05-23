import Image from "next/image";
import { MovieDetailsType } from "../types/movieDetail.types";
const BASE_IMAGE_URL = `https://image.tmdb.org/t/p/w500`;
function MovieDetails({ movie }: { movie: MovieDetailsType }) {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="relative w-full h-[550px]">
        <Image
          fill
          src={`${BASE_IMAGE_URL}/${movie.poster_path}`}
          alt={movie.poster_path}
          className="absolute w-full h-full object-cover object-top"
        />
      </div>

      <div>
        <h1>{movie.original_title}</h1>
        {/* @ts-expect-error */}
        <p>{movie?.release_date}</p>
      </div>
    </div>
  );
}

export default MovieDetails;
