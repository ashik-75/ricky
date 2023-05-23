"use client";

import LoadingPage from "@/components/Loader/LoadingPage";
import Spinner from "@/components/Loader/Spinner";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import MovieList from "../components/MovieList";
import { getData } from "../services/getData";

function SearchPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["search", q],
    queryFn: ({ pageParam }) => {
      const page = pageParam || 1;
      return getData(`search/movie?query=${q}&page=${page}`);
    },
    getNextPageParam: (lastPage) =>
      lastPage?.page
        ? lastPage?.page < lastPage?.total_page
          ? lastPage?.page + 1
          : undefined
        : undefined,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  const movies = data?.pages.map((page) => page.results).flat() || [];

  return (
    <div>
      <MovieList movies={movies} />

      {hasNextPage === false ? null : (
        <div className="flex items-center justify-center py-10">
          <button
            onClick={() => fetchNextPage()}
            className="text-white bg-teal-600 font-medium rounded px-4 py-2 "
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? <Spinner color="white" /> : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
