import { Copyrigth } from './../components/Jcopyright'
import { Hero } from './../components/Jhero'
import { SignIn } from './../components/JsignIn'
import { EmptyMemories } from './../components/JemptyMemories'

export default function Home() {
  return (
    <main className="grid min-h-screen grid-cols-2">
      <div
        title="ColunaLeft"
        className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16"
      >
        <div
          title="Blur"
          className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full"
        />
        <div
          title="Stripes"
          className="absolute bottom-0 right-2 top-0 w-2 bg-stripes"
        />
        <SignIn />
        <Hero />
        <Copyrigth />
      </div>
      <div
        title="ColunaRight"
        className="flex flex-col bg-[url(../assets/bg-stars.svg)] bg-cover p-16"
      >
        <EmptyMemories />
      </div>
    </main>
  )
}
