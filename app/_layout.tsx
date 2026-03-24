import { getToken } from "@/lib/utils/tokenStorage";
import {
  Inter_100Thin,
  Inter_400Regular,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
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
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const segments = useSegments();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inTabsGroup = segments[0] === "(tabs)";

    console.log("Navigation check:", {
      isLoggedIn,
      inAuthGroup,
      inTabsGroup,
      currentSegment: segments[0],
    });

    if (isLoggedIn && !inTabsGroup) {
      router.replace("/(tabs)/home");
    } else if (!isLoggedIn && !inAuthGroup) {
      console.log(" No token - Redirecting to login");
      router.replace("/(auth)/login");
    }
  }, [isLoggedIn, isLoading, segments]);

  const checkAuth = async () => {
    try {
      const token = await getToken();
      setIsLoggedIn(!!token);
    } catch (error) {
      console.log("Auth error:", error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (!fontsLoaded) {
    return null;
  }
  if (isLoading) {
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
