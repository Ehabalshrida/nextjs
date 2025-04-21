import { NextRequest, NextResponse } from "next/server";
// import { articles } from "@/utils/data";
import { ArticleProps } from "@/utils/types";
import { UpdateArticleDto } from "@/utils/dtos/article.dto";
import { prisma } from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
/**
 * GET ~/api/articles/:articleId
 * @method GET
 * @route ~/api/articles/:articleId
 * @returns single article
 * @access public
 */
export async function GET(req: NextRequest, { params }: ArticleProps) {
  try {
    console.log({ params });
    // const article = articles.find(
    //   (article) => article.id === Number(props.params.articleId)
    // );
    const article = await prisma.article.findUnique({
      where: {
        id: parseInt(params?.articleId),
      },
      include: {
        comments: {
          orderBy: { createdAt: "desc" },
          include: { user: { select: { username: true, email: true } } },
        },
      },
    });
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.log({ error });
    NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}

/**
 * PUT ~/api/articles/:articleId
 * @method PUT
 * @route ~/api/articles/:articleId
 * @returns update single article
 * @access public
 */
export async function PUT(req: NextRequest, props: ArticleProps) {
  try {
    // const article = articles.find(
    //   (article) => article.id === Number(props.params.articleId)
    // );
    const userPayload = verifyToken(req);
    if (!userPayload || !userPayload.isAdmin) {
      return NextResponse.json(
        { message: "only admin, access denied" },
        { status: 403 }
      );
    }
    const article = await prisma.article.findUnique({
      where: { id: Number(props.params.articleId) },
    });
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    const body = (await req.json()) as UpdateArticleDto;
    console.log({ body });
    const updatedArticle = await prisma.article.update({
      where: { id: Number(props.params.articleId) },
      data: {
        ...body,
      },
    });
    return NextResponse.json({ ...updatedArticle }, { status: 200 });
  } catch (error) {
    console.log({ error });
    NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}

/**
 * DELETE ~/api/articles/:articleId
 * @method DELETE
 * @route ~/api/articles/:articleId
 * @returns delete article
 * @access public
 */
export async function DELETE(req: NextRequest, props: ArticleProps) {
  try {
    console.log({ props });
    // const article = articles.find(
    //   (article) => article.id === Number(props.params.articleId)
    // );
    const article = await prisma.article.findUnique({
      where: { id: Number(props.params.articleId) },
      include: {comments: true}
    });
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    await prisma.article.delete({
      where: { id: Number(props.params.articleId) },
    });
    // not needed since we have define OnDelete: Cascade in the schema, so we can comment this code .
    // const commentsIds = article.comments.map((comment) => comment.id);
    // await prisma.comment.deleteMany({
    //   where: {
    //     id: {
    //       in: commentsIds,
    //     },
    //   },
    // });
    return NextResponse.json(
      { message: "Article deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log({ error });
    NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}
