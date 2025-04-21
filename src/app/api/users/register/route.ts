import { NextRequest, NextResponse } from "next/server";
import { RegisterUserDto } from "@/utils/dtos/user.dto";
import { registerSchema } from "@/utils/validationSchema";
import { prisma } from "@/utils/db";
import bcrypt from "bcryptjs";
import { JWTPayload } from "@/utils/types";
import { setCookies } from "@/utils/generateTocken";
/**
 * POST ~/api/users/register
 * @method POST
 * @route ~/api/users/register
 * @returns register user
 * @access public
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RegisterUserDto;
    const validation = registerSchema.safeParse(body);
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
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (user) {
      return NextResponse.json(
        { message: "user already exists" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    body.password = hashedPassword;
    const newUser = await prisma.user.create({
      data: {
        ...body,
      },
    });

  const payload: JWTPayload = { 
        id: newUser.id, 
        isAdmin: newUser.isAdmin, 
        username: newUser.username
      }
      // generate token, when set token in authorization header
    //   const accessToken = generateToken(payload);
    // return NextResponse.json({ accessToken }, { status: 201 });

    // generate token, when set token in cookie
    const cookie = setCookies(payload);
    return NextResponse.json({ message: "registered, authenticated" }, { status: 200, headers: {
      'Set-Cookie': cookie
    } });
  } catch (error) {
    console.log({ error });
    NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}
