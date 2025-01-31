import { useRouter } from "expo-router";
import { Button, Text, YStack } from "tamagui";
import { useAuthStore } from "../contexts/authStore";
import { LogOut } from "@tamagui/lucide-icons";

export default function SettingsScreen() {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <YStack flex={1} p="$4" space="$4">
      <YStack flex={1} space="$4">
        <Text fontSize="$6" fontWeight="bold">
          Account Settings
        </Text>

        {/* Aquí puedes agregar más opciones de configuración */}
      </YStack>

      <Button onPress={handleLogout} theme="red" icon={LogOut} size="$5">
        Logout
      </Button>
    </YStack>
  );
}
