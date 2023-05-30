import { User } from 'lucide-react' // Importa icone 'User' do pacote lucide-react linha:22
import Image from 'next/image' // Habilita tag <Image /> para importa imagem linha:32
import nlwlogo from '../assets/nlw-spacetime-logo.svg' // Importando imagem em react linha:32

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      {/* COLUNA LEFT or DIREITA */}
      <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
        {/* Blur sombra bg */}
        <div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />
        {/* Stripes or tracejado */}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />
        {/* PERFIL USER or CAIXA 1 */}
        <a
          href=""
          className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
        >
          {/* User bar or Barra do usuario */}
          <div className="flex  h-10 w-10 items-center justify-center rounded-full bg-gray-400">
            {/* Icon or Icone perfil */}
            <User className="h-5 w-5 text-gray-500" />
          </div>
          {/* texto do perfil */}
          <p className="max-w-[140px] text-sm leading-snug">
            <span className="underline">Crie sua conta</span> salve suas
            memórias!
          </p>
        </a>
        {/* HERO or CAIXA 2 */}
        <div className="space-y-5">
          <Image src={nlwlogo} alt="Nlw Spacetime" />
          <div className="max-w-[420px] space-y-1">
            <h1 className="text-5xl font-bold leading-tight text-green-50">
              Sua cápsula do tempo
            </h1>
            <p className="text-lg leading-relaxed">
              Colecione momentos marcantes na sua jornada e compartilhe (se
              quiser) com o mundo!
            </p>
            <a
              className="inline-block rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
              href=""
            >
              CADASTRAR LEMBRANÇA
            </a>
          </div>
        </div>
        {/* Copyright */}
        <div className="text-sm leading-relaxed text-gray-200">
          Feito com 💙 no NLW da{' '}
          <a
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-gray-100"
            href="https://Rocketseat.com"
          >
            Rocketseat
          </a>
        </div>
      </div>
      {/* COLUNA RIGHT OR COLUNA DA ESQUERDA */}
      <div className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16">
        <div className="flex flex-1 items-center justify-center">
          <p className="w-[360px] text-center leading-relaxed">
            Você ainda nao registrou nenhuma lembrança, comece a{' '}
            <a href="" className="underline hover:text-gray-50">
              criar agora
            </a>
            !
          </p>
        </div>
      </div>
    </main>
  )
}
