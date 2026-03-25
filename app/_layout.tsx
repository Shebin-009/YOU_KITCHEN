import { getToken } from "@/lib/utils/tokenStorage";
import {
  Inter_100Thin,
  Inter_400Regular,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { Stack, router, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
    Inter_100Thin,
    Inter_900Black,
    ...Ionicons.font,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const segments = useSegments();

  const checkAuth = async () => {
    const token = await getToken();
    setIsLoggedIn(!!token);
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, [segments]);

  useEffect(() => {
    if (isLoading || isLoggedIn === null) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    if (isLoggedIn && !inTabsGroup) {
      router.replace("/(tabs)/home");
    } else if (!isLoggedIn && !inAuthGroup && segments.length > 0) {
      router.replace("/");
    }
  }, [isLoggedIn, isLoading, segments]);

  if (!fontsLoaded || isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F6F6F6",
        }}
      >
        <ActivityIndicator size="large" color="#037EB2" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
