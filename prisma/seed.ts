import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const organization = await prisma.organization.create({
        data: {
            name: 'Mango',
        }
    })


    const teamMember1 = await prisma.organization_People.create({
        data: {
            email: 'himanshu@mango.io',
            name: 'Himanshu Sharma',
            role: 'admin',
            organizationId: organization.organization_id
        }
    });

    const teamMember2 = await prisma.organization_People.create({
        data: {
            email: 'kinshu@mango.io',
            name: 'Kinshu Sharma',
            role: 'member',
            organizationId: organization.organization_id
        }
    });

    const teamMember3 = await prisma.organization_People.create({
        data: {
            email: 'rahul@mango.io',
            name: 'Rahul Sharma',
            role: 'member',
            organizationId: organization.organization_id
        }
    });

    const customer1 = await prisma.customer.create({
        data: {
            first_name: 'John',
            last_name: 'Doe',
            phone: 11111,
            email: 'john.doe@example.com',
            organizationId: organization.organization_id,
        },
    });

    const customer2 = await prisma.customer.create({
        data: {
            first_name: 'Jane',
            last_name: 'Smith',
            phone: 22222,
            email: 'jane.smith@example.com',
            organizationId: organization.organization_id,
        },
    });


    console.log(organization, teamMember1, teamMember2, teamMember3, customer1, customer2)
};


main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })