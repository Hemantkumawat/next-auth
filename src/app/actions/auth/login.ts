import { ApiError, statusCodes } from '@/utils/errorResponse';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const jwtSecret = process.env.AUTH_SECRET;

if (!jwtSecret) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

export const login = async (email: string, password: string) => {
  // Check if the user exists in the database
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError('Invalid email or password', statusCodes.UNAUTHORIZED);
  }

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError('Invalid email or password', statusCodes.UNAUTHORIZED);
  }

  // Generate a JWT token
  const token = jwt.sign({ id: user.id, email: user.email, roleId: user.roleId }, jwtSecret, { expiresIn: '1h' });

  // Save the token in the Prisma db accessTokens table
  await prisma.accessToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour from now
    },
  });

  return { user, accessToken: token };
};