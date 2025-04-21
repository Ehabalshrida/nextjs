import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
// import Jwt from "jsonwebtoken";
// import { JWTPayload } from "@/utils/types";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/dtos/user.dto";
import { updateSchema } from "@/utils/validationSchema";
import bcrypt from "bcryptjs";
interface Props {
  params: { id: string };
}

/**
 * DELETE ~/api/users/profile/:id
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @returns confirm user delete
 * @access private
 */
export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  try {
    console.log({ id });
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { comments: true },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    // when set token in authorization header
    // const accessToken = request.headers.get("Authorization");

    // if (!accessToken) {
    //   return NextResponse.json(
    //     { message: "no token provided, access denied" },
    //     { status: 401 }
    //   );
    // }
    // const secretKey = process.env.SECRET_KEY;
    // if (!secretKey) {
    //   throw new Error();
    // }
    // let payLoad: JWTPayload;
    // try {
    // when set token in authorization header
    //  payLoad = Jwt.verify(accessToken.split(" ")[1], secretKey) as JWTPayload;

    // when set token in cookie
    //   payLoad = Jwt.verify(accessToken, secretKey) as JWTPayload;
    // } catch (error) {
    //   console.log({ error });
    //   return NextResponse.json({ message: "invalid token, " }, { status: 401 });
    // }
    // when set token in cookie
    const userPayload = verifyToken(request);
    if (userPayload !== null && userPayload.id === user.id) {
      await prisma.user.delete({ where: { id: Number(id) } });
      // not needed since we have define OnDelete: Cascade in the schema, so we can comment this code .

      //   const commentsIds = user.comments.map((comment) => comment.id);
      // await prisma.comment.deleteMany({
      //   where: {
      //     id: {
      //       in: commentsIds,
      //     },
      //   },
      // });
      return NextResponse.json({ message: "user deleted" }, { status: 200 });
    }
    return NextResponse.json(
      { message: "user not authorized to delete profile, access denied" },
      { status: 403 }
    );
  } catch (error) {
    console.log({ error });
    NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}

/**
 * GET ~/api/users/profile/:id
 * @method GET
 * @route ~/api/users/profile/:id
 * @returns login user profile
 * @access private
 */
export async function GET(req: NextRequest, { params: { id } }: Props) {
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const userPayload = verifyToken(req);
    if (userPayload !== null && userPayload.id === user.id) {
      const { password, ...excludePassword } = user;
      console.log({ password });
      return NextResponse.json({ ...excludePassword }, { status: 200 });
    }
    return NextResponse.json(
      { message: "not allowed, access denied" },
      { status: 403 }
    );
  } catch (error) {
    console.log({ error });
    NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}

/**
 * PUT ~/api/users/profile/:id
 * @method PUT
 * @route ~/api/users/profile/:id
 * @returns update logged in user profile
 * @access private
 */
export async function PUT(req: NextRequest, { params: { id } }: Props) {
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const userPayload = verifyToken(req);
    if (userPayload !== null && userPayload.id === user.id) {
      const body = (await req.json()) as UpdateUserDto;
      const validation = updateSchema.safeParse(body);
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
      if (body.password) {
        const salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(body.password, salt);
      }
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { ...body },
      });
      const { password, ...excludePassword } = updatedUser;
      console.log({
        password,
      });
      return NextResponse.json({ ...excludePassword }, { status: 200 });
    }
    return NextResponse.json(
      { message: "not allowed, access denied" },
      { status: 403 }
    );
  } catch (error) {
    console.log({ error });
    NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}
