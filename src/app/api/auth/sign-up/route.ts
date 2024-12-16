import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import userValidationSchema from '@/app/validations/sign-up';
import { NextRequest, NextResponse } from 'next/server';
import { ApiError, errorResponse, statusCodes } from '@/utils/errorResponse';
import { successResponse } from '@/utils/successResponse';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const requestData = await req.json();
        await userValidationSchema.validate(requestData, { abortEarly: false });
        const hashedPassword = await bcrypt.hash(requestData.password, 10);
        const user = await prisma.user.create({
            data: {
                ...requestData,
                password: hashedPassword,

            },
        });

        return successResponse({ message: 'User Created successfully', data: user, status: statusCodes.CREATED });
    } catch (error) {
        return errorResponse(error);
    }
}