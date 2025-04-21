import { NextRequest, NextResponse } from "next/server";
import { LoginUserDto } from "@/utils/dtos/user.dto";
// import { loginSchema } from "@/utils/validationSchema";
import { prisma } from "@/utils/db";
import bcrypt from "bcryptjs";
import { JWTPayload } from "@/utils/types";
import { setCookies } from "@/utils/generateTocken";
/**
 * POST ~/api/users/login
 * @method POST
 * @route ~/api/users/login
 * @returns register user
 * @access public
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LoginUserDto;
    // const validation = loginSchema.safeParse(body);
    // if (!validation.success) {
    //   const errorObject = validation.error.issues.reduce((acc, issue) => {
    //     acc[issue.path.join(".")] = issue.message;
    //     return acc;
    //   }, {} as Record<string, string>);
    //   return NextResponse.json({ errors: errorObject }, { status: 400 });
    // }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return NextResponse.json(
        { message: "email or password wrong" },
        { status: 400 }
      );
    }
    const isMatch = await bcrypt.compare(body.password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "email or password wrong" },
        { status: 400 }
      );
    }
    const payload: JWTPayload = { 
      id: user.id, 
      isAdmin: user.isAdmin, 
      username: user.username
    }

    // set cookie   
    const cookie = setCookies(payload);
    // generate token
    // const accessToken = generateToken(payload);
      
    // return response using token in authorization header
    // return NextResponse.json({ accessToken }, { status: 200 });

    // return response using token in cookie
    return NextResponse.json({ message: "login success" }, { status: 200, headers: {
      'Set-Cookie': cookie
    } });
  } catch (error) {
    console.log({ error });
    NextResponse.json({ message: "internal server error" }, { status: 500 });
  }
}
