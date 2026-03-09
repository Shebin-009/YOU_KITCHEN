import { Stack, router } from "expo-router";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_700Bold,
  Inter_100Thin,
  Inter_900Black,
} from "@expo-google-fonts/inter";

import { getToken } from "@/src/api/utils/tokenStorage";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_100Thin,
    Inter_900Black,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();

        if (token) {
          console.log("Token found:", token);
          router.replace("/dashboard");
        } else {
          console.log("No token found");
          router.replace("/");
        }
      } catch (error) {
        console.log("Auth error:", error);
      }
    };
    checkAuth();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
