import { seedRolesAndPermissions } from '@/seeders/rolesAndPermissionsSeeder';

const runSeeders = async () => {
    console.log('Running seeders...');
    console.log('Seeding roles and permissions...');
    await seedRolesAndPermissions();
    console.log('Seeders ran successfully.');
};

// runSeeders().catch((error) => {
//     console.error('Error running seeders:', error);
//     process.exit(1);
// });

export default runSeeders;