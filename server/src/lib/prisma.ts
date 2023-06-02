import { PrismaClient } from '@prisma/client'

export const funcaoprisma = new PrismaClient({
  // faz log de todos as querys
  log: ['query'],
})
