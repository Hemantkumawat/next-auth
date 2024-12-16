import { errorResponse, statusCodes } from '@/utils/errorResponse';
import { successResponse } from '@/utils/successResponse';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        // get the user payload from the request object that was attached by the auth middleware
        const user = (req as any);
        console.log('user::', user);
        return successResponse({ message: 'User details fetched in successfully', data: user, status: statusCodes.OK });
    } catch (error) {
        return errorResponse(error);
    }
}