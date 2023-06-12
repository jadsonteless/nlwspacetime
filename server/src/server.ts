import 'dotenv/config'

import fastify from 'fastify'
import corsPlugin from '@fastify/cors'
import jwt from '@fastify/jwt'
import { rotaMemorias } from './rotas/memories'
import { authRoutes } from './rotas/auth'

const funcaoFastify = fastify()

funcaoFastify.register(corsPlugin, {
  origin: true, // todas as url de front-end poderão acessar nosso back-end
})

funcaoFastify.register(jwt, {
  secret: 'spacetime'
})

funcaoFastify.register(rotaMemorias)
funcaoFastify.register(authRoutes)

funcaoFastify
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('rodando na porta 3333')
  })
