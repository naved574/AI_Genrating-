import { PrismaClient, AiProvider, PlanKey } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.plan.upsert({
    where: { id: "free" },
    update: {},
    create: {
      id: "free",
      key: PlanKey.FREE,
      name: "Free",
      description: "Start creating with starter credits.",
      monthlyPriceCents: 0,
      monthlyCredits: 25,
      features: ["25 starter credits", "Community gallery", "Standard queue"],
    },
  });

  await prisma.plan.upsert({
    where: { id: "pro" },
    update: {},
    create: {
      id: "pro",
      key: PlanKey.PRO,
      name: "Pro",
      description: "For active creators publishing weekly.",
      monthlyPriceCents: 1900,
      monthlyCredits: 1200,
      features: ["1,200 credits / month", "Turbo queue", "Private generations"],
    },
  });

  await prisma.plan.upsert({
    where: { id: "studio" },
    update: {},
    create: {
      id: "studio",
      key: PlanKey.STUDIO,
      name: "Studio",
      description: "For creators shipping daily content.",
      monthlyPriceCents: 4900,
      monthlyCredits: 4000,
      features: ["4,000 credits / month", "Priority queue", "Brand presets"],
    },
  });

  await prisma.aiModel.upsert({
    where: { slug: "openai-image" },
    update: {},
    create: {
      slug: "openai-image",
      name: "OpenAI Image",
      provider: AiProvider.OPENAI,
      providerModel: "gpt-image-1",
      category: "text-to-image",
      costCredits: 8,
      supportedAspectRatios: ["1:1", "4:3", "16:9", "9:16"],
      enabled: true,
    },
  });

  await prisma.aiModel.upsert({
    where: { slug: "hf-stable-diffusion-xl" },
    update: {},
    create: {
      slug: "hf-stable-diffusion-xl",
      name: "Stable Diffusion XL",
      provider: AiProvider.HUGGINGFACE,
      providerModel: "stabilityai/stable-diffusion-xl-base-1.0",
      category: "text-to-image",
      costCredits: 6,
      supportedAspectRatios: ["1:1", "4:3", "16:9"],
      enabled: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
