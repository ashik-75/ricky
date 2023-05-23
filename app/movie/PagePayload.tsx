"use client";

import LoadingPage from "@/components/Loader/LoadingPage";
import Spinner from "@/components/Loader/Spinner";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import MovieList from "./components/MovieList";
import { getData } from "./services/getData";
import { MovieType } from "./types/movie.types";

function PagePayload({ initialPayload }: any) {
  const [movies, setMovies] = useState<MovieType[]>(
    initialPayload.results || []
  );

  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isStale,
    isError,
    error,
    fetchStatus,
    isPaused,
    isInitialLoading,
  } = useInfiniteQuery({
    queryKey: ["movies", type],
    queryFn: ({ pageParam }) => {
      const page = type
        ? pageParam || 1
        : pageParam || initialPayload?.page + 1;
      return getData(`movie/${type || "popular"}/?page=${page}`);
    },
    getNextPageParam: (lastPage) => lastPage.page + 1,
    enabled: type ? true : false,
    onSuccess: (data) => {
      const allPagesData = data?.pages?.map((page) => page?.results).flat();

      if (type) {
        setMovies(allPagesData);
      } else {
        setMovies([...initialPayload?.results, ...allPagesData]);
      }
    },
  });

  if (isInitialLoading) {
    return <LoadingPage />;
  }

  return (
    <div>
      <MovieList movies={movies} />

      <div className="flex justify-center items-center py-10">
        {hasNextPage === false ? null : (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2 flex items-center gap-3 rounded shadow font-semibold text-white bg-rose-600"
          >
            {isFetchingNextPage ? (
              <span>
                <Spinner color="white" />
              </span>
            ) : (
              "Load More"
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default PagePayload;
