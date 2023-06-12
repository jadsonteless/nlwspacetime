import { FastifyInstance } from 'fastify'
import axios from 'axios'
import { z } from 'zod'
import { prismaFuncao } from '../lib/prisma'

export async function authRoutes(funcaoFastify: FastifyInstance) {
  funcaoFastify.post('/register', async (request) => {
    const bodySchema = z.object({
      code: z.string(),
    })

    const { code } = bodySchema.parse(request.body)

    const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      null,
      {
        params: {
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    )

    const { access_token } = accessTokenResponse.data
    const userResponse = await axios.get('https://api.github.com/user', {
     headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    
    const validandoDados = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
    }) 
    
    const userInfor = validandoDados.parse(userResponse.data)

    let user = await prismaFuncao.user.findUnique({
      where: {
        githubId: userInfor.id
      }
    })
    if (!user) {
      user = await prismaFuncao.user.create({
        data: {
          githubId: userInfor.id,
          login: userInfor.login,
          nome: userInfor.name,
          avatarUrl: userInfor.avatar_url,
        }
      })
    }
    const token = funcaoFastify.jwt.sign(
      {
      name: user.nome,
      avatarUrl: user.avatarUrl,
      }, 
      {
        sub: user.id, 
        expiresIn: '30 days', 
      }
    )


    return {
      token,
    }
  })
}
