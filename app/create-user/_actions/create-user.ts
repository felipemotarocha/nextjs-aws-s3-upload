"use server";

import { db } from "@/app/_lib/prisma";
import {
  ListObjectsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { redirect } from "next/navigation";

export const createUser = async (form: FormData) => {
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  const file = form.get("image") as File;

  const user = await db.user.create({
    data: {
      email,
      password,
    },
  });

  const buffer = (await file.arrayBuffer()) as Buffer;

  // upload file to aws s3
  const client = new S3Client();

  const key = `profile-pictures/${user.id}.${file.type.split("/")[1]}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    ACL: "public-read",
    Key: key,
    Body: buffer,
  });

  await client.send(command);

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      imageUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${key}`,
    },
  });

  redirect("/");
};
