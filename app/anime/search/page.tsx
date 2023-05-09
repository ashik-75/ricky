"use client";

import Loader from "@/components/Loader/Loader";
import { getListOfData } from "@/services/mortyApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import Filtering from "../Filtering";
import LoadMore from "../LoadMore";
import Characters from "../components/Characters";

function convertToQuery(queryObject: any) {
  const keys = Object.keys(queryObject);

  let output = "";
  for (let key of keys) {
    if (keys.indexOf(key) === keys.length - 1) {
      output += `${key}=${queryObject[key]}`;
    } else {
      output += `${key}=${queryObject[key]}&`;
    }
  }

  return output;
}

function SearchPage() {
  const searchParams = useSearchParams();
  const queryString = `name=${searchParams.get(
    "name"
  )}&gender=${searchParams.get("gender")}`;
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isStale,
  } = useInfiniteQuery({
    queryKey: ["search", queryString],
    queryFn: ({ pageParam }) => {
      const url =
        pageParam || `https://rickandmortyapi.com/api/character?${queryString}`;
      console.log(pageParam, url);
      return getListOfData(url);
    },
    getNextPageParam: (lastPage) => lastPage.info.next,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const characters = data?.pages.map((info: any) => info.results).flat();

  if (characters.length === 0) {
    return (
      <div>
        Nothing found for :
        {searchParams.get("name") || searchParams.get("gender")}
      </div>
    );
  }

  return (
    <div className="mt-5">
      <Filtering />
      <p>Search: {searchParams.get("name")}</p>

      <Characters characters={characters || []} />

      <LoadMore
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        isStale={isStale}
      />
    </div>
  );
}

export default SearchPage;
