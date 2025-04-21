import { NextResponse } from "next/server";
import { prisma } from "@/utils/db";

/**
 * GET ~/api/articles/count
 * @method GET
 * @route  ~/api/articles/count
 * @returns number of articles
 * @access public
 */
export async function GET() {
  try {
    const count = await prisma.article.count();
    return NextResponse.json(count, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}