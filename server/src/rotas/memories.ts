import { FastifyInstance } from 'fastify'
import { prismaFuncao } from '../lib/prisma'
import { z } from 'zod'

export async function rotaMemorias(funcaoFastify: FastifyInstance) {
  funcaoFastify.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  }) 
  
  funcaoFastify.get('/memories', async (request) => {
 
    const conteudoMemories = await prismaFuncao.memory.findMany({
      where: {
        userId: request.user.sub
      },
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

  funcaoFastify.get('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = paramsSchema.parse(request.params)

    const memoryDoSql = await prismaFuncao.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (!memoryDoSql.isPubluc && memoryDoSql.userId != request.user.sub) {
      return reply.status(401).send()
    }

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
        userId: request.user.sub, 
      },
    })

    return memoryDoSql
  })

  funcaoFastify.put('/memories/:id', async (request, reply) => {
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

    let memoryDoSql = await prismaFuncao.memory.findFirstOrThrow({
      where: {
        id,
      }
    })

    if (memoryDoSql.userId !== request.user.sub) {
      return reply.status(401).send()
    }
    memoryDoSql = await prismaFuncao.memory.update({
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

  funcaoFastify.delete('/memories/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    let memoryDoSql = await prismaFuncao.memory.findFirstOrThrow({
      where: {
        id,
      }
    })

    if (memoryDoSql.userId != request.user.sub) {
      return reply.status(401).send()
    }

    await prismaFuncao.memory.delete({
      where: {
        id,
      },
    })
  })
}
