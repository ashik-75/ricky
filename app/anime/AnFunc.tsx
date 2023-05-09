"use client";

import { getListOfData } from "@/services/mortyApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Filtering from "./Filtering";
import LoadMore from "./LoadMore";
import Characters from "./components/Characters";

function AnFunc({ payload }: any) {
  const [characters, setCharacters] = useState(payload.results || []);
  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    isStale,
  } = useInfiniteQuery({
    queryKey: ["characters"],
    queryFn: ({ pageParam }) => {
      const url =
        pageParam ||
        payload.info.next ||
        "https://rickandmortyapi.com/api/character";

      return getListOfData(url);
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.info.next;
    },
    enabled: false,
  });

  useEffect(() => {
    const latestCharacter =
      data?.pages.map((dt: any) => dt.results).flat() || [];

    setCharacters((prev: any) => [...prev, ...latestCharacter]);
  }, [data?.pages]);

  if (isLoading && !isStale) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="space-y-5">
      <Filtering />
      <Characters characters={characters} />

      <LoadMore
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        isState={isStale}
      />
    </div>
  );
}

export default AnFunc;
