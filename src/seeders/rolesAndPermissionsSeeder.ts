import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedRolesAndPermissions = async () => {
  const roles = [
    { name: 'Admin' },
    { name: 'User' },
    { name: 'Guest' },
  ];

  const permissions = [
    { name: 'read' },
    { name: 'write' },
    { name: 'delete' },
  ];

  try {
    prisma.role.deleteMany();
    // Seed roles
    for (const role of roles) {
      if (role && role.name) {
        await prisma.role.create({
          data: role,
        });
      } else {
        console.error('Invalid role:', role);
      }
    }

    prisma.rolePermission.deleteMany();

    // Seed permissions
    for (const permission of permissions) {
      if (permission && permission.name) {
        await prisma.permission.create({
          data: permission,
        });
      } else {
        console.error('Invalid permission:', permission);
      }
    }

    // Fetch all roles and permissions to create relationships
    const allRoles = await prisma.role.findMany();
    const allPermissions = await prisma.permission.findMany();

    prisma.rolePermission.deleteMany();

    // Seed role permissions
    for (const role of allRoles) {
      for (const permission of allPermissions) {
        await prisma.rolePermission.create({
          data:{
            roleId: role.id,
            permissionId: permission.id,
        }
        });
      }
    }

    console.log('Roles and permissions seeded successfully.');
  } catch (error) {
    console.error('Error seeding roles and permissions:', (error as any).message);
  } finally {
    await prisma.$disconnect();
  }
};