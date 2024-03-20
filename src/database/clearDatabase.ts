import prisma from "./prisma";
import { exec } from "child_process";

async function aplicarMigracoes() {
  return new Promise<void>((resolve, reject) => {
    exec("npx prisma migrate dev").on("close", (codigoSaida) => {
      if (codigoSaida === 0) {
        console.log("Migrações aplicadas com sucesso.");
        resolve();
      } else {
        const mensagemErro = `Erro ao aplicar migrações. Código de saída: ${codigoSaida}`;
        console.error(mensagemErro);
        reject(new Error(mensagemErro));
      }
    });
  });
}

async function resetarBancoDeDados() {
  try {
    await prisma.payment.deleteMany();
    await prisma.order.deleteMany();
    await prisma.productOrder.deleteMany();
    await prisma.additional.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    await prisma.$executeRaw`TRUNCATE TABLE categories RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE additional RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE orders RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE payments RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "productOrder" RESTART IDENTITY CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE products RESTART IDENTITY CASCADE;`;

    await aplicarMigracoes();
  } catch (error) {
    console.error("Erro ao resetar o banco de dados:", error);
  }
}

export default resetarBancoDeDados;
