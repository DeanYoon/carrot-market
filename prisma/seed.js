const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { username: "DeanYoon" },
    update: {},
    create: {
      username: "DeanYoon",
      avatar: "https://avatars.githubusercontent.com/u/68269605?v=4",
    },
  });

  const basePhoto = "/img3.jpg"; // same photo for all products

  // Create 50 products
  const products = Array.from({ length: 50 }, (_, i) => ({
    title: `phone ${i + 1}`,
    price: 1000000 + i * 10000, // increasing price for each product
    description: `phone model ${i + 1}`,
    photo: basePhoto,
    userId: user.id,
  }));

  // Insert the products into the database
  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log("50 products created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
