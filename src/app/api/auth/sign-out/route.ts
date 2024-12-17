import { NextRequest } from 'next/server';
import { ApiError, errorResponse, statusCodes } from '@/utils/errorResponse';
import { successResponse } from '@/utils/successResponse';
import { logout } from '@/app/actions/auth/logout';


export async function GET(req: NextRequest) {
    try {
        // get token from header
        const token = req.headers.get('Authorization');
        if (!token) {
            throw new ApiError('Unauthorized', statusCodes.UNAUTHORIZED);
        }
        // split token to get the actual token
        const accessToken = token.split(' ')[1];
        const res = await logout(accessToken);
        return successResponse({ message: 'User logged out successfully', data: res, status: statusCodes.CREATED });
    } catch (error) {
        return errorResponse(error);
    }
}