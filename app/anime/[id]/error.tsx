"use client";

function Error({ error }: { error: Error }) {
  return (
    <div>
      <h1>{error.message}</h1>
      <p>something went wrong</p>
    </div>
  );
}

export default Error;
