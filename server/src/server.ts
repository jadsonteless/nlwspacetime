import fastify from 'fastify'
import corsPlugin from '@fastify/cors'
import { rotaMemorias } from './rotas/memories'

const funcaoFastify = fastify()

funcaoFastify.register(corsPlugin, {
  origin: true, // todas as url de front-end poderão acessar nosso back-end
})
funcaoFastify.register(rotaMemorias)

funcaoFastify
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('rodando na porta 3333')
  })
