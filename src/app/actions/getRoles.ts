import prisma from "@/utils/db";

export const getRoles = async () => {
  const roles = await prisma.role.findMany({
    include: {
      rolePermissions: true,
    },
  });
  return roles;
};