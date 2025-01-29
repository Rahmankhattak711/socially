"use server";

import { prisma } from "@/lib/prisma";
import { userGetdbUserId } from "./userAction";
import { revalidatePath } from "next/cache";

export async function createPost(content: string, image: string) {
  try {
    const userId = await userGetdbUserId();

    const postCreate = await prisma.post.create({
      data: {
        content,
        image,
        authorId: userId,
      },
    });

    revalidatePath("/");
    return { success: true, post: postCreate };
  } catch (error) {
    console.log('error in createPost',error);
    return { success: false, error };
  }
}
