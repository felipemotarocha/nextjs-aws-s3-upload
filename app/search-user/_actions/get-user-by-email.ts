"use server";

import { db } from "@/app/_lib/prisma";
import { User } from "@prisma/client";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};
