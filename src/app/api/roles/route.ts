import prisma from '@/utils/db';
import { errorResponse } from '@/utils/errorResponse';
import { successResponse } from '@/utils/successResponse';


export async function GET() {
    try {
        const roles = await prisma.role.findMany({
            include: {
                rolePermissions: true,
            },
        });
        return successResponse({ message: 'Roles list', data: roles });
    } catch (error) {
        return errorResponse(error);
    }
}