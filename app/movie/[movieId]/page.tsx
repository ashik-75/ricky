import { Metadata } from "next";
import { getData } from "../services/getData";
import MovieDetails from "./component/MovieDetails";

export const generateMetadata = async ({
  params,
}: {
  params: { movieId: string };
}): Promise<Metadata> => {
  const data = await getData(`movie/${params.movieId}`);

  return {
    title: data?.original_title,
  };
};

async function page({ params }: { params: { movieId: string } }) {
  const data = await getData(`movie/${params.movieId}`);
  return (
    <div>
      <h1>page - {params.movieId}</h1>

      <MovieDetails movie={data} />
    </div>
  );
}

export default page;
