# Criando e configurando auth.ts

1. Deve ser imprtado o Zod, FastifyInstance/fastify e axios
```ts
import { FastifyInstance } from 'fastify' // faz a instancia de rotas Q.2 
import axios from 'axios' // utilizadp para fazer requisições http Q.5
import { z } from 'zod' // utilizado para validar Q.3 Q.8
import { prismaFuncao } from '../lib/prisma' // busca ou criar novo usuario
```

2. Criando rota de envior para resposta
```ts 
export async function authRoutes(funcaoFastify: FastifyInstance) {
  funcaoFastify.post('/register', async (request) => { // cria a rota de requisição no exemplo é "register"
        // aqui dentro vai todas o codigo do auth.ts
  }
}
```

3. Validando dados enviado na requisição com zod
```ts
const bodySchema = z.object({ // valida e guarda detro da var que no exemplo é "bodySchema"
      code: z.string(), // garante quais dados e qual o tipo sera enviado ou recebido que no exemplo é "code" seguido de string
    })
```

4. Quarda o codigo Validando dentro de var
````ts
 const { code } = bodySchema.parse(request.body)    
``````

5. Cria a var com as chaves de acesso e parametros para o github.com 
````ts
const accessTokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token', // caminho onde os paramentros será enviado
      null, //o corpo que no exemplo nao tem
      {
        params: { // chaves de acesso e o tipo que será enviado
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code, // var tratada pelo zod na questão 3.
        },
        headers: { // informar ao git que tipo de arquivo seja devolvido no response
          Accept: 'application/json',
        },
      },
    )
``````

6. Guarda o accessTokenResponse.data dentro de uma var
````ts
 const { access_token } = accessTokenResponse.data // contem todos os dados
``````

7. Eviado o access_token para que o Git devolvar o dados para acesso 
````ts
const userResponse = await axios.get('https://api.github.com/user', {
     headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
``````

8. Var com os paramentros que devem ser recebido do github Validando com zod
````ts
const validandoDados = z.object({
      id: z.number(),
      login: z.string(),
      name: z.string(),
      avatar_url: z.string().url(), // .url para garantir q a string será uma url
    })
``````

9. Utilizara var validadoras para filtra a resposta dada do github
````ts
const userInfor = validandoDados.parse(userResponse.data)
``````

10. Verificando se usuario existe se não será criado um novo
````ts
let user = await prismaFuncao.user.findUnique({ //busca usuario
      where: { // informa quais os paramentros para busca o usuario
        githubId: userInfor.id
      }
    })
    
    // se o user nao for encontrado, if criarar novo user
    if (!user) {
      user = await prismaFuncao.user.create({
        data: { // preenche dados da tabelas com os dados fornecido do github
          githubId: userInfor.id,
          login: userInfor.login,
          nome: userInfor.name,
          avatarUrl: userInfor.avatar_url,
        }
      })
``````
