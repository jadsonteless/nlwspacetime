import { FastifyInstance } from 'fastify'
import { prismaFuncao } from '../lib/prisma'
import { z } from 'zod' // trata.valida informação recebida

export async function rotaMemorias(funcaoFastify: FastifyInstance) {
  funcaoFastify.get('/memories', async () => {
    const conteudoMemories = await prismaFuncao.memory.findMany({
      orderBy: {
        createdAt: 'asc',
      },
    })

    return conteudoMemories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.coverUrl,
        limitCaracteresExcerpt: memory.content.substring(0, 115).concat('...'),
      }
    })
  })

  funcaoFastify.get('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const memoryDoSql = await prismaFuncao.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    return memoryDoSql
  })

  funcaoFastify.post('/memories', async (request) => {
    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPubluc: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPubluc } = bodySchema.parse(request.body)

    const memoryDoSql = await prismaFuncao.memory.create({
      data: {
        content,
        coverUrl,
        isPubluc,
        userId: '45e5a820-68f3-42f8-8015-49e67122e7a1',
      },
    })

    return memoryDoSql
  })

  funcaoFastify.put('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPubluc: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPubluc } = bodySchema.parse(request.body)

    const memoryDoSql = prismaFuncao.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPubluc,
      },
    })

    return memoryDoSql
  })

  funcaoFastify.delete('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    await prismaFuncao.memory.delete({
      where: {
        id,
      },
    })
  })
}
