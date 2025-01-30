import { useColorScheme } from "react-native";
import { TamaguiProvider, type TamaguiProviderProps } from "tamagui";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { config } from "../tamagui.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Provider({
  children,
  ...rest
}: Omit<TamaguiProviderProps, "config">) {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();

  return (
    <TamaguiProvider
      config={config}
      defaultTheme={colorScheme === "dark" ? "dark" : "light"}
      {...rest}
    >
      <QueryClientProvider client={queryClient}>
        <ToastProvider swipeDirection="horizontal" duration={6000}>
          {children}
          <ToastViewport top="$8" left={0} right={0} />
        </ToastProvider>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
