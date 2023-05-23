"use client";

function Error({ error }: { error: Error }) {
  return <div>Error happen - {error.message}</div>;
}

export default Error;
