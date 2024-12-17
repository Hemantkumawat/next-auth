import { NextRequest, NextResponse } from 'next/server';
import { errorResponse, statusCodes } from '@/utils/errorResponse';
import { successResponse } from '@/utils/successResponse';
import signInValidationSchema from '@/app/validations/signInSchema';
import { login } from '@/app/actions/auth/login';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const requestData = await req.json();
        await signInValidationSchema.validate(requestData, { abortEarly: false });
        const { user, accessToken } = await login(requestData.email, requestData.password);
        return successResponse({
            message: 'User Logged in successfully',
            data: { user, accessToken },
            status: statusCodes.OK
        });
    } catch (error) {
        console.log('error:::', error);
        return errorResponse(error);
    }
}