"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

const categories = [
  {
    id: 1,
    name: "Popular",
    slug: "popular",
  },
  {
    id: 2,
    name: "Top Rated",
    slug: "top_rated",
  },
  {
    id: 3,
    name: "Upcoming",
    slug: "upcoming",
  },
  {
    id: 4,
    name: "Now Playing",
    slug: "now_playing",
  },
];

function Category() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  console.log({ type });
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState<string>(type || "");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);

    router.push(`/movie?type=${e.target.value}`);
  };

  console.log({ selectedOption });
  return (
    <div>
      <form>
        <div>
          {categories.map((category) => (
            <div key={category.id} className="gap-2">
              <input
                type="radio"
                name="options"
                value={category.slug}
                id={category.slug}
                className="p-1"
                checked={selectedOption === category.slug}
                onChange={handleChange}
              />
              <label htmlFor={category.slug}>{category.name}</label>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}

export default Category;
