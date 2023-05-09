"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";

function Filtering() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  const router = useRouter();

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  }, []);

  const handleForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push(
      `/anime/search?${createQueryString("name", name)}&${createQueryString(
        "gender",
        gender
      )}`
    );
  };

  return (
    <div className="flex gap-10">
      <form onSubmit={handleForm} className="flex gap-5">
        <div>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Enter name ..."
            className="px-3 py-1 rounded outline-none border border-gray-300 placeholder:text-sm w-full bg-transparent"
          />
        </div>

        <Select onValueChange={(value) => setGender(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="">Select --</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="genderless">Genderless</SelectItem>
              <SelectItem value="unknown">Unknown</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div>
          <button className="border border-gray-300 px-4 py-1 rounded ">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}

export default Filtering;
