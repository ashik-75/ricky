async function Location({ promise }: any) {
  const location = await promise;
  return (
    <div>
      <h1 className="font-semibold mb-2 text-lg underline underline-offset-2">
        Location
      </h1>
      <div>
        <h1>Name: {location.name}</h1>
        <h1>Type:{location.type}</h1>
        <h1>Dimension: {location.dimension}</h1>
      </div>
    </div>
  );
}

export default Location;
