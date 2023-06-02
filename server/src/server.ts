import fastify from 'fastify'
import { rotaMemorias } from './rotas/memories'

const funcaoFastify = fastify()

funcaoFastify.register(rotaMemorias)

funcaoFastify
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('rodando na porta 3333')
  })
