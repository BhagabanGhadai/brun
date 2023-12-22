import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient({
    log:env.NODE_ENV=="dev"?["query"]:undefined
})

export default prisma;