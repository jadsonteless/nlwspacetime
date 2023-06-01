import { StatusBar } from 'expo-status-bar'
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

import imagemPng from './src/assets/bg-blur.png'
import ComponentComSvg from './src/assets/stripes.svg'
import ComponentComLogoSvg from './src/assets/nlw-spacetime-logo.svg'

import { styled } from 'nativewind'

const VarComSvg = styled(ComponentComSvg)
const VarComLogoSvg = styled(ComponentComLogoSvg)

export default function App() {
  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  // hasLoadedFonts = tras a informação se todas as fonts foram carregadas
  if (!hasLoadedFonts) {
    return null
  }

  return (
    <ImageBackground
      source={imagemPng}
      className="relative flex-1 items-center bg-gray-950 px-8"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <VarComSvg className="absolute left-2" />

      <View className="flex-1 items-center justify-center gap-6">
        <VarComLogoSvg />

        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua cápsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-50">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>
        <TouchableOpacity className="rounded-full bg-green-500 px-5 py-3">
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar lembranças
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="light" translucent />
    </ImageBackground>
  )
}
