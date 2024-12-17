import prisma from "@/utils/db";
import { ApiError, statusCodes } from "@/utils/errorResponse";

export const getUser = async (userId:string) => {
    if (!userId) {
        throw new ApiError('User not found', statusCodes.NOT_FOUND);
    }
    
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new ApiError('User not found', statusCodes.NOT_FOUND);
    }
    return user;
};