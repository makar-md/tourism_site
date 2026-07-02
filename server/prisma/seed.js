import { PrismaClient } from './generated/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from "dotenv";
dotenv.config()

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.Role.createMany({
        data: [
            { id: 1, name: "user" },
            { id: 2, name: "admin" },
            { id: 3, name: "moderator" }
        ],
        skipDuplicates: true
    });

    await prisma.RoutStatus.createMany({
        data: [
            { id: 1, name: "private" },
            { id: 2, name: "moderation" },
            { id: 3, name: "public" }
        ],
        skipDuplicates: true
    });
}

main().catch(console.error) .finally(async () => {
    await prisma.$disconnect();
});