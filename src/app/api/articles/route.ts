import { NextResponse, NextRequest } from "next/server";
// import { articles } from "@/utils/data";
import { CreateArticleDto } from "@/utils/dtos/article.dto";
// import { Article } from "@/utils/types";
import { createArticleSchema } from "@/utils/validationSchema";
import { Article } from "@prisma/client";
import { prisma } from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { PAGE_SIZE } from "@/utils/constants";
/**
 * GET ~/api/articles
 * @method GET
 * @route ~/api/articles?pageNumber=${pageNumber}&pageSize=${pageSize}
 * @returns list of articles
 * @access public
 */
export async function GET(req: NextRequest) {
  console.log(req);
  const pageNumber = req.nextUrl.searchParams.get("pageNumber") || "1";
  const pageSize = req.nextUrl.searchParams.get("pageSize") || PAGE_SIZE.toString();
  console.log({ pageNumber, pageSize });
  const articles: Article[] = await prisma.article.findMany({
    skip: (parseInt(pageNumber) - 1) * parseInt(pageSize),
    take: parseInt(pageSize),
  });
  try {
    return NextResponse.json(Array.isArray(articles) ? articles : [], { status: 200 });
  } catch (error) {
    console.log({ error });
    NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}
/**
 * POST ~/api/articles
 * @method POST
 * @route ~/api/articles
 * @returns newly created article
 * @access public
 */
export async function POST(req: NextRequest) {
  try {
    // only admin can create a article
    const userPayload = verifyToken(req);
    if (!userPayload || !userPayload.isAdmin) {
      return NextResponse.json({ message: "only admin, access denied" }, { status: 403 });
    }
    const reqBody = (await req.json()) as CreateArticleDto;
    const validation = createArticleSchema.safeParse(reqBody);
    if (!validation.success) {
      const errorObject = validation.error.issues.reduce((acc, issue) => {
        acc[issue.path.join(".")] = issue.message;
        return acc;
      }, {} as Record<string, string>);
      return NextResponse.json({ errors: errorObject }, { status: 400 });
    //   return NextResponse.json(
    //     { message: validation.error.errors[0].message },
    //     { status: 400 }
    // );      
    }

    // const newArticle: Article = {
    //   id: articles.length + 1,
    //   userId: 1,
    //   ...reqBody,
    // };
    // articles.push(newArticle);
    const newArticle: Article = await prisma.article.create({
      data: {
        ...reqBody,
      },
    });
    return NextResponse.json({ ...newArticle }, { status: 201 });
  } catch (error) {
    console.log({ error });
    NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}
