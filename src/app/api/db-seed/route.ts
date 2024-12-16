import { NextRequest } from 'next/server';
import { ApiError, errorResponse, statusCodes } from '@/utils/errorResponse';
import { successResponse } from '@/utils/successResponse';
import runSeeders from '@/seeders';


export async function POST(req: NextRequest) {
    try {
        await runSeeders();
        return successResponse({ message: 'Seeder executed successfully', data: {}, status: statusCodes.CREATED });
    } catch (error) {
        return errorResponse(error);
    }
}