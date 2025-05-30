import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { JWTPayload } from "@/utils/types";

// Verify Token For api endpioint
export function verifyToken(request: NextRequest): JWTPayload | null {
    try {
        const jwtToken = request.cookies.get("jwtToken");
        const token = jwtToken?.value as string;
        if (!token) return null;

        const privateKey = process.env.SECRET_KEY as string;
        const userPayload = jwt.verify(token, privateKey) as JWTPayload;

        return userPayload;
    } catch (error) {
        console.log({ error });
        return null;
    }
}
// Verify Token For Page
export function verifyTokenForPage(token: string): JWTPayload | null {
    try {
        const privateKey = process.env.SECRET_KEY as string;
        const userPayload = jwt.verify(token, privateKey) as JWTPayload;
        if(!userPayload) return null;

        return userPayload;
    } catch (error) {
        console.log({ error });
        return null;
    }
}