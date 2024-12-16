import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcrypt';
import { ApiError, statusCodes } from '@/utils/errorResponse';


export const verifyToken = async (token: string) => {
    console.log('token:::', token);
    // const { payload } = await jwtVerify(token, secret);


    // Check if the token exists in the Prisma db accessTokens table
    // const storedToken = await prisma.accessToken.findUnique({ where: { id: token } });

    // if (!storedToken) {
    //   throw new Error('Invalid token');
    // }

    return {};
};