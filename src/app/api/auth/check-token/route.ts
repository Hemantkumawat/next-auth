import { NextRequest } from 'next/server';
import { ApiError, errorResponse, statusCodes } from '@/utils/errorResponse';
import { successResponse } from '@/utils/successResponse';
import { JWTExpired } from 'jose/errors';
import prisma from '@/utils/db';


export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token || typeof token !== 'string') {
      throw new ApiError('Token is required', statusCodes.BAD_REQUEST);
    }

    const blacklistedToken = await prisma.blacklistedToken.findUnique({ where: { token } });

    if (blacklistedToken) {
      return successResponse({
        message: 'Token is blacklisted',
        data: 'blacklisted',
        status: statusCodes.OK,
      });
    }

    return successResponse({
      message: 'Token is valid',
      data: 'valid',
      status: statusCodes.OK,
    });
  } catch (error) {
    if (error instanceof JWTExpired && error.code === 'ERR_JWT_EXPIRED') {
      return errorResponse(new ApiError(`Unable to verify token. Reason: ${error.reason}`, statusCodes.UNAUTHORIZED));
    }
    return errorResponse(new ApiError('Internal server error', statusCodes.INTERNAL_SERVER_ERROR));
  }
}