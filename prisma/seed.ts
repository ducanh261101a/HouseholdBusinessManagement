// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const post1 = await prisma.user.upsert({
    where: { userId: 1 },
    update: {},
    create: {
      username: 'admin',
      password:
        '$argon2id$v=19$m=4096,t=3,p=1$3WZFJL/7CZ95K3uXHAOWdQ$82M2XZsI8Dqg1tY7EtwIt3AEZYxciDnRPUCq+9oigt8',
      email: 'thaianh02012002@gmail.com',
    },
  });

  console.log({ post1 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
