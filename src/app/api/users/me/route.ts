import { getUser } from '@/app/actions/user/getUser';
import { ApiError, errorResponse, statusCodes } from '@/utils/errorResponse';
import { successResponse } from '@/utils/successResponse';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const userId = req.headers.get('x-user-id');
        if (!userId) {
            throw new ApiError('User not found', statusCodes.NOT_FOUND);
        }
        const user = await getUser(userId);
        return successResponse({ message: 'User details fetched in successfully', data: user, status: statusCodes.OK });
    } catch (error) {
        console.error('error:::', error);
        return errorResponse(error);
    }
}