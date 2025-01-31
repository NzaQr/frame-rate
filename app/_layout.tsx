import "../tamagui-web.css";
import { useEffect } from "react";
import { StatusBar, useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useTheme } from "tamagui";
import Provider from "./Provider";
import { useAuthStore } from "contexts/authStore";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  const segments = useSegments();
  const router = useRouter();
  const { isAuthenticated, initializeAuth } = useAuthStore();

  // Initialize authentication
  useEffect(() => {
    initializeAuth();
  }, []);

  // Handle authentication routing
  useEffect(() => {
    if (!interLoaded && !interError) return; // Wait for fonts to load before navigation

    const inAuthGroup = segments[0] === "(tabs)" || segments[0] === "modal";
    if (!isAuthenticated && inAuthGroup) {
      router.replace("/login");
    } else if (isAuthenticated && !inAuthGroup) {
      router.replace("/(tabs)");
    }
  }, [isAuthenticated, segments, interLoaded, interError]);

  // Handle splash screen
  useEffect(() => {
    if (interLoaded || interError) {
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return (
    <Providers>
      <RootLayoutNav />
    </Providers>
  );
}

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <Provider>{children}</Provider>;
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="modal"
          options={({ route }) => {
            const params = route.params as { movie?: string };
            type MovieData = { title: string };
            let movieData: MovieData | null = null;
            try {
              movieData = params.movie ? JSON.parse(params.movie) : null;
            } catch (error) {
              console.error("Error parsing movie data:", error);
            }
            return {
              headerShown: false,
              presentation: "modal",
              gestureEnabled: true,
              gestureDirection: "horizontal",
              contentStyle: {
                backgroundColor: theme.background.val,
              },
            };
          }}
        />

        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="register"
          options={{
            headerShown: true,
            title: "Register",
            headerBackTitle: "Back",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
