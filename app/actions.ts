"use server";

import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import axios from "axios";

export async function addUser(user: User) {
  const res = await prisma.user.create({
    data: user,
  });

  return res;
}

export async function getUsers(lastId?: number) {
  const users = await axios.get(
    `http://localhost:3000/api/users?cursor=${lastId}`
  );

  return users.data;
}

export async function deleteUser(email: string) {
  const res = await prisma.user.delete({
    where: {
      email: email,
    },
  });

  return res;
}

export async function updateUser(payload: User) {
  const res = await prisma.user.update({
    where: {
      email: payload.email,
    },
    data: payload,
  });

  return res;
}
