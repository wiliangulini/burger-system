import { hash } from "bcryptjs";

import { prisma } from "../src/lib/db";

const BCRYPT_COST = 12;
const MIN_PASSWORD_LENGTH = 12;

async function seedCatalogoEConfiguracao() {
  await prisma.$transaction(async (tx) => {
    const hamburgueres = await tx.categoria.upsert({
      where: { slug: "hamburgueres" },
      update: {},
      create: {
        nome: "Hambúrgueres",
        slug: "hamburgueres",
      },
    });

    const bebidas = await tx.categoria.upsert({
      where: { slug: "bebidas" },
      update: {},
      create: {
        nome: "Bebidas",
        slug: "bebidas",
      },
    });

    await tx.produto.upsert({
      where: { slug: "x-burger" },
      update: {},
      create: {
        categoriaId: hamburgueres.id,
        nome: "X-Burger",
        slug: "x-burger",
        descricao: "Hambúrguer clássico da casa.",
        preco: "24.90",
      },
    });

    await tx.produto.upsert({
      where: { slug: "refrigerante-lata" },
      update: {},
      create: {
        categoriaId: bebidas.id,
        nome: "Refrigerante em lata",
        slug: "refrigerante-lata",
        preco: "7.00",
      },
    });

    await tx.configLoja.upsert({
      where: { id: 1 },
      update: {},
      create: {
        id: 1,
        nomeLoja: "Burger Shop",
        taxaEntrega: "5.00",
        pedidoMinimo: "0.00",
        tempoMedioMinutos: 30,
        aceitaPedidos: true,
      },
    });
  });
}

async function seedAdminDesenvolvimento() {
  if (process.env.SEED_ADMIN_ENABLED !== "true") {
    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("O seed de admin é proibido em produção.");
  }

  const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !email.includes("@")) {
    throw new Error("SEED_ADMIN_EMAIL deve conter um email válido.");
  }

  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(
      `SEED_ADMIN_PASSWORD deve conter ao menos ${MIN_PASSWORD_LENGTH} caracteres.`,
    );
  }

  const senhaHash = await hash(password, BCRYPT_COST);

  await prisma.usuario.upsert({
    where: { email },
    update: {},
    create: {
      nome: "Administrador",
      email,
      senhaHash,
      role: "OWNER",
    },
  });
}

async function main() {
  await seedCatalogoEConfiguracao();
  await seedAdminDesenvolvimento();
  console.info("Seed mínimo concluído.");
}

main()
  .catch((error: unknown) => {
    console.error("Falha ao executar o seed.");
    console.error(error instanceof Error ? error.message : "Erro desconhecido.");
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
