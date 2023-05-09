import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  //   await sleep(2000);
  const data = await axios.get("https://rickandmortyapi.com/api/character/");

  return NextResponse.json({
    message: data.data,
  });
}
