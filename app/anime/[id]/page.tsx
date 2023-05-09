// "use client";

import { getListOfData } from "@/services/mortyApi";
import { Metadata } from "next";
import { Suspense } from "react";
import Loader from "../../../components/Loader/Loader";
import Boundary from "./Boundary";
import Details from "./Details";
import Episode from "./Episode";
import Location from "./Location";

const getSingleData = async (endpoint: string) => {
  console.log({ endpoint });
  const response = await fetch(endpoint);

  console.log(response.ok ? "OK" : "NOT", endpoint);

  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  return response.json();
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const singleCharacter = await getSingleData(
    `https://rickandmortyapi.com/api/character/${params.id}`
  );

  if (!singleCharacter) {
    return {};
  }

  return {
    title: singleCharacter.name,
  };
}

export async function generateStaticParams() {
  const cch = await getListOfData(`https://rickandmortyapi.com/api/character`);

  return cch.results.map((c: any) => {
    id: c.id;
  });
}

async function CharacterDetails({ params }: { params: { id: string } }) {
  const data = await getSingleData(
    `https://rickandmortyapi.com/api/character/${params.id}`
  );

  const episode = getSingleData(data.episode[0]);
  const locationPromise = getSingleData(data?.location?.url);

  return (
    <div className="grid grid-cols-2 gap-5 max-w-7xl mx-auto">
      <Details {...data} />

      <div className="space-y-5">
        <Suspense fallback={<Loader />}>
          {/* @ts-expect-error */}
          <Episode episode={episode} />
        </Suspense>

        <Boundary>
          <Suspense fallback={<Loader />}>
            {/* @ts-expect-error */}
            <Location promise={locationPromise} />
          </Suspense>
        </Boundary>
      </div>
    </div>
  );
}

export default CharacterDetails;
