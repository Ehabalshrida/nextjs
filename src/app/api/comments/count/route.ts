import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

/**
 * GET ~/api/comments/count
 * @method GET
 * @route  ~/api/comments/count
 * @returns number of comments
 * @access public
 */
export async function GET() {
  try {
    const count = await prisma.comment.count();
    return NextResponse.json(count, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}