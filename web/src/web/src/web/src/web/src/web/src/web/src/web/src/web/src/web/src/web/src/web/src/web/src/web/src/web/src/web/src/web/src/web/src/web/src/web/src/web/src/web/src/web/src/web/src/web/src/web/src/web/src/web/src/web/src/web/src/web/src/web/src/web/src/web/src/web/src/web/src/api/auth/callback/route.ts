import { NextRequest } from 'next/server' // utilizado para tipar o metodo GET

export async function GET(request: NextRequest) {
  console.log('oi') // para testa dando F5 na page do erro 404
}
