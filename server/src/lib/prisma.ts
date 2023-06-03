import { PrismaClient } from '@prisma/client'

export const prismaFuncao = new PrismaClient({
  // faz log de todos as querys
  log: ['query'],
})
