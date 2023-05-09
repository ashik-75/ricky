async function Episode({ episode }: any) {
  const result = await episode;
  return (
    <div>
      <h1 className="font-semibold mb-2 text-lg underline underline-offset-2">
        Episode
      </h1>
      <div>
        <h1>{result?.name}</h1>
        <h1>{result?.air_date}</h1>
        <h1>{result?.episode}</h1>
      </div>
    </div>
  );
}

export default Episode;
