import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = ['Produtos de Limpeza', 'Comida', 'Bebida', 'Outros'];

async function main() {
  console.log(`Start seeding ...`);
  for (const category of categories) {
    console.log(`Seeding category: ${category}`);
    await prisma.category.create({
      data: {
        name: category,
      },
    });
  }

  console.log(`Seeding finished.`);
}

main();
