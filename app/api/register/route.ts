import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  const saltRounds = 10;
  let hashedPassword;

  await bcrypt
    .hash(password, saltRounds)
    .then((hash) => {
      hashedPassword = hash;
    })
    .catch((err) => console.error(err.message));

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
