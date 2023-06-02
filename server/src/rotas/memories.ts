import { FastifyInstance } from 'fastify'
import { funcaoprisma } from '../lib/prisma'

export async function rotaMemorias(funcaoFastify: FastifyInstance) {
  funcaoFastify.get('/memories', async () => {
    const conteudoMemories = await funcaoprisma.memory.findMany({
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

  funcaoFastify.get('/memories/:id', async () => {})

  funcaoFastify.post('/memories/:id', async () => {})

  funcaoFastify.put('/memories/:id', async () => {})

  funcaoFastify.delete('/memories/:id', async () => {})
}
