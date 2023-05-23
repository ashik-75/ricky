import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const lastId = req?.url?.split("?")[1]?.split("=")[1];
    const cursorObject = Number(lastId) ? { id: Number(lastId) } : undefined;
    console.log({ cursorObject, lastId });

    const users = await prisma.user.findMany({
      take: 4,
      skip: 1,
      cursor: cursorObject,
    });

    console.log(users);

    let nextCursor = [...users].pop()?.id;

    return NextResponse.json({
      users: users,
      cursor: nextCursor || undefined,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return new Response(error?.message, {
        status: 404,
      });
    }

    return new Response("error.message", {
      status: 404,
    });
  }
}
