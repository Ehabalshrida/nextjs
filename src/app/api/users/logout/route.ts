import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
/**
 *  @method  GET
 *  @route   ~/api/users/logout
 *  @desc    Logout User
 *  @access  public
 */
export async function GET() {
    try {
         (await cookies()).delete("jwtToken")
        return NextResponse.json({ message: 'logout' }, { status: 200 });
        ;
}catch (error) {
    console.log({ error });
    return NextResponse.json(
        { message: 'internal server error' },
        { status: 500 }
    )
}
}