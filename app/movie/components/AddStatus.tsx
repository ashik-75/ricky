"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React, { useCallback, useState } from "react";

function AddStatus() {
  const [status, setStatus] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams()!;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams();
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value);

    console.log({ pathname, val: e.target.value });

    router.push(pathname + "?" + createQueryString("status", e.target.value));
  };
  return (
    <div>
      <input
        type="checkbox"
        value={"active"}
        checked={status === "active"}
        onChange={handleChange}
      />
    </div>
  );
}

export default AddStatus;
