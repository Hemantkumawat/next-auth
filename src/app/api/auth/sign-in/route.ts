import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { errorResponse, statusCodes } from '@/utils/errorResponse';
import { successResponse } from '@/utils/successResponse';
import { signIn } from '@/app/lib/auth';
import signInValidationSchema from '@/app/validations/signInSchema';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const requestData = await req.json();
        await signInValidationSchema.validate(requestData, { abortEarly: false });
        const { user, accessToken } = await signIn(requestData);
        return successResponse({ message: 'User Logged in successfully', data: { user, accessToken }, status: statusCodes.OK });
    } catch (error) {
        return errorResponse(error);
    }
}