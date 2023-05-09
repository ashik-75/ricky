import AnFunc from "./AnFunc";

const getListOfData = async (endpoint: string) => {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error("Went wrong on anime page");
  }

  return response.json();
};

async function Anime() {
  const data = await getListOfData("https://rickandmortyapi.com/api/character");
  return (
    <div className="max-w-7xl mx-auto">
      <AnFunc payload={data} />
    </div>
  );
}

export default Anime;
