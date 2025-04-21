import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import {PAGE_SIZE} from "@/utils/constants";

/**
 * GET ~/api/articles/search?searchText=${searchText}
 * @method GET
 * @route ~/api/articles/search?searchText=${searchText}
 * @returns search articles
 * @access public
 */
export async function GET(req: NextRequest) {
  try {
    const searchText = req.nextUrl.searchParams.get("searchText");
    let searchData;
    if (searchText) {
      searchData = await prisma.article.findMany({
        where: {
          OR: [
            { title: { contains: searchText } },
            { description: { contains: searchText } },
          ],
        },
      });
    } else {
      searchData = await prisma.article.findMany({ skip: 0, take: PAGE_SIZE });
    }
    return NextResponse.json(searchData, { status: 200 });
  } catch (error) {
    console.log({ error });
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
