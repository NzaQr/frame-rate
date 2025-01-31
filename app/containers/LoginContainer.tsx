import { useRouter } from "expo-router";
import LoginForm from "../components/LoginForm";
import { YStack } from "tamagui";
import { useAuthStore } from "contexts/authStore";

const LoginContainer = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (email: string, password: string) => {
    const success = await login(email, password);
    if (success) {
      router.replace("/(tabs)");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleRegisterPress = () => {
    router.push("/register");
  };


  
  return (
    <YStack flex={1} justify="center" bg="$background">
      <LoginForm
        onSubmit={handleSubmit}
        onRegisterPress={handleRegisterPress}
      />
    </YStack>
  );
};
export default LoginContainer;
