import prisma from "@/utils/db";
import { ApiError, statusCodes } from "@/utils/errorResponse";

export const blacklistToken = async (token: string, expiresIn: number) => {
  const expiryDate = new Date(Date.now() + expiresIn);
  await prisma.blacklistedToken.create({
    data: {
      token,
      expiresAt: expiryDate,
    },
  });
};

export const logout = async (token: string) => {
  if (!token) {
    throw new ApiError('Not authenticated', statusCodes.UNAUTHORIZED);
  }

  try {
    // Delete the token from the Prisma db accessTokens table
    await prisma.accessToken.delete({ where: { token } });

    // Blacklist the token in Prisma
    const expiresIn = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
    await blacklistToken(token, expiresIn);

    return { message: 'Signed out successfully' };
  } catch (error) {
    console.error('Error signing out:', error);
    throw new ApiError('Internal server error', statusCodes.INTERNAL_SERVER_ERROR);
  }
};