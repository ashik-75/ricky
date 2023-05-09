import kv from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET() {
  const recipes = await kv.lrange("recipes", 0, -1);
  return NextResponse.json({
    recipes,
  });
}
