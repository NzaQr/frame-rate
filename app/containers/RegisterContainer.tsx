import { useRouter } from "expo-router";
import RegisterForm from "../components/RegisterForm";
import { YStack } from "tamagui";
import { useAuthStore } from "contexts/authStore";

const RegisterContainer = () => {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);

  const handleSubmit = async (
    username: string,
    email: string,
    password: string
  ) => {
    const success = await register(username, email, password);
    if (success) {
      router.replace("/(tabs)");
    } else {
      alert("Email already exists");
    }
  };

  const handleLoginPress = () => {
    router.back();
  };

  return (
    <YStack flex={1} justify="center" bg="$background">
      <RegisterForm onSubmit={handleSubmit} onLoginPress={handleLoginPress} />
    </YStack>
  );
};
export default RegisterContainer;
