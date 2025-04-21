import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import { prisma } from "@/utils/db";
import { CreateCommentDto } from "@/utils/dtos/comment.dto";
import { createCommentShema } from "@/utils/validationSchema";
import { PAGE_SIZE } from "@/utils/constants";

/**
 * POST ~/api/comments
 * @method POST
 * @route ~/api/comments
 * @returns create a comment
 * @access private
 */

export async function POST(req: NextRequest) {
  try {
    const userPayload = verifyToken(req);
    if (userPayload !== null) {
      const body = (await req.json()) as CreateCommentDto;
      const validation = createCommentShema.safeParse(body);
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
      const comment = await prisma.comment.create({
        data: {
          ...body,
          articleId: Number(body.articleId),
          userId: userPayload.id,
        },
      });
      return NextResponse.json(comment, { status: 201 });
    }
    return NextResponse.json(
      { message: "only logged in user can comment, access denied" },
      { status: 401 }
    );
  } catch (error) {
    console.log({ error });
    NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}
/**
 * GET ~/api/comments
 * @method GET
 * @route ~/api/comments
 * @returns all comments
 * @access private
 */

export async function GET(req: NextRequest) {
  try {
    const userPayload = verifyToken(req);
    if (userPayload !== null && userPayload.isAdmin) {
      const pageNumber = req.nextUrl.searchParams.get("pageNumber") || "1";
      const pageSize =
        req.nextUrl.searchParams.get("pageSize") || PAGE_SIZE.toString();
      const comments = await prisma.comment.findMany({
        skip: (parseInt(pageNumber) - 1) * parseInt(pageSize),
        take: parseInt(pageSize),
      });
      return NextResponse.json(comments, { status: 200 });
    }
    return NextResponse.json(
      { message: "only for admins, access denied" },
      { status: 403 }
    );
  } catch (error) {
    console.log({ error });
    NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}
