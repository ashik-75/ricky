"use server";
import kv from "@vercel/kv";
import { revalidatePath } from "next/cache";

export async function getRecipes() {
  try {
    const recipes = await kv.lrange("recipes", 0, -1);

    return recipes;
  } catch (error) {
    throw new Error("Something went wrong!");
  }
}

export async function addRecipes(payload: FormData) {
  try {
    const data = await kv.lpush("recipes", {
      title: payload.get("title"),
      image: payload.get("image"),
    });

    revalidatePath("/");

    return data;
  } catch (error) {
    throw new Error("Something went wrong!");
  }
}

export async function removeRecipe(title: string) {
  try {
    const rem = await kv.rpop("recipes");

    revalidatePath("/");

    return rem;
  } catch (error) {
    throw new Error("Something went wrong!");
  }
}

export async function justRevalidate() {
  revalidatePath("/dashboard");
}
