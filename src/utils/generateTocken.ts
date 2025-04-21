import { JWTPayload } from "./types";
import Jwt from "jsonwebtoken";
import {serialize} from 'cookie'

export const generateToken = (payload: JWTPayload) => {    
    return Jwt.sign(
        payload,
        process.env.SECRET_KEY as string,
        {
            expiresIn: "30d",
        }
    );
}

export const setCookies = (payload: JWTPayload) => {
    const token = generateToken(payload);
    const cookie = serialize("jwtToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // development=http, production= https
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return cookie;
}