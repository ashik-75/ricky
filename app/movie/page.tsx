import { Metadata } from "next";
import PagePayload from "./PagePayload";
import { getData } from "./services/getData";

export const metadata: Metadata = {
  title: "Movie App",
  description: "All the latest info",
};

async function Movie() {
  const data = await getData(`movie/popular`);

  return (
    <div>
      <PagePayload initialPayload={data} />
    </div>
  );
}

export default Movie;
