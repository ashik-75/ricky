"use client";

import Spinner from "@/components/Loader/Spinner";

function LoadMore({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  isState,
}: any) {
  return hasNextPage === false ? null : (
    <div className="my-10 flex items-center justify-center">
      <button
        onClick={() => {
          fetchNextPage();
        }}
        className={`px-4 py-2 rounded bg-rose-600 text-white flex gap-2 items-center ${
          isFetchingNextPage ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={isFetchingNextPage}
      >
        <span>Load More</span>
        <span>{isFetchingNextPage && <Spinner color="white" />}</span>
      </button>
    </div>
  );
}

export default LoadMore;
