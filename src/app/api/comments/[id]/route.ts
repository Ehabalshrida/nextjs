import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import { prisma } from "@/utils/db";
import { UpdateCommentDto } from "@/utils/dtos/comment.dto";
import { updateCommentShema } from "@/utils/validationSchema";
import { CommentProps } from "@/utils/types";

/**
 * PUT ~/api/comments/:id
 * @method PUT
 * @route ~/api/comments/:id
 * @returns update a comment
 * @access private
 */
export async function PUT(req: NextRequest, { params: { id } }: CommentProps) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }
    const user = verifyToken(req);
    if (user === null) {
      return NextResponse.json(
        { message: "only logged in user can update comment, access denied" },
        { status: 401 }
      );
    }
    if (user.id !== comment.userId) {
      return NextResponse.json(
        {
          message: "only the owner of the comment can update it, access denied",
        },
        { status: 403 }
      );
    }
    const body = (await req.json()) as UpdateCommentDto;
    const validation = updateCommentShema.safeParse(body);
    if (!validation.success) {
     // const errorObject = validation.error.issues.reduce((acc, issue) => {
      //   acc[issue.path.join(".")] = issue.message;
      //   return acc;
      // }, {} as Record<string, string>);
      // return NextResponse.json({ errors: errorObject }, { status: 400 });
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
    );     
    }
    const updatedCooment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: {
        ...body,
      },
    });
    return NextResponse.json(updatedCooment, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE ~/api/comments/:id
 * @method DELETE
 * @route ~/api/comments/:id
 * @returns delete a comment
 * @access private
 */
export async function DELETE(
  req: NextRequest,
  { params: { id } }: CommentProps
) {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });
    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }
    const user = verifyToken(req);
    if (user === null) {
      return NextResponse.json(
        { message: "only logged in user can delete comment, access denied" },
        { status: 401 }
      );
    }
    console.log({ userId: user.id, CommentUserId: comment.userId });    
    if (user.id === comment.userId || user.isAdmin) {
      await prisma.comment.delete({
        where: { id: parseInt(id) },
      });
      return NextResponse.json(
        { message: "comment deleted successfully" },
        { status: 200 }
      );
    }
    if (user.id !== comment.userId) {
        return NextResponse.json(
          {
            message: "only the owner of the comment can delete it, access denied",
          },
          { status: 403 }
        );
      }
  } catch {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
