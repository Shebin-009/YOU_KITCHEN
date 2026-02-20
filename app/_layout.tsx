import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {useFonts} from "expo-font";
import {
  Inter_400Regular,
  Inter_700Bold,
  Inter_100Thin,
  Inter_900Black
} from "@expo-google-fonts/inter"
import "@expo-google-fonts/inter"

export default function RootLayout() {
  const[fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_100Thin,
    Inter_900Black
  })

  if(!fontsLoaded){
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack />
    </SafeAreaView>
  );
}
