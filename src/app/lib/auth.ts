import { SignJWT, jwtVerify, JWTPayload } from 'jose';
// import prisma from '@/utils/db';

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

export const verifyToken = async (token: string): Promise<JWTPayload> => {
    const { payload } = await jwtVerify(token, secret);

    // Check if the token exists in the Prisma db accessTokens table
    // const storedToken = await prisma.accessToken.findUnique({ where: { token } });

    // if (!storedToken) {
    //   throw new ApiError('Invalid token', statusCodes.UNAUTHORIZED);
    // }

    return payload;
};