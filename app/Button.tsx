"use client";

import { removeRecipe } from "./actions";

function Button({ title }: { title: string }) {
  return (
    <button
      onClick={async () => {
        await removeRecipe(title);
      }}
      className="px-2 py-1 rounded text-white bg-rose-600"
    >
      Remove
    </button>
  );
}

export default Button;
