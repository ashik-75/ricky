"use client";

import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    router.push(`${pathname}/search?q=${search}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search anything you want ..."
          className="px-4 py-2 rounded border border-slate-700 bg-transparent outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
}

export default SearchBar;
