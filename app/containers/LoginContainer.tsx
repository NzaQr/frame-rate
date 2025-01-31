import { useRouter } from "expo-router";
import LoginForm from "../components/LoginForm";
import { YStack } from "tamagui";
import { useAuthStore } from "contexts/authStore";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { movieApi } from "services/movieApi";
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [currentBackdropIndex, setCurrentBackdropIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { data: movies } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: () => movieApi.fetchPopularMovies(),
  });

  useEffect(() => {
    if (!movies?.length) return;

    const interval = setInterval(() => {
      setCurrentBackdropIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  const handleSubmitInput = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    await handleSubmit(email, password);
    setLoading(false);
  };

  const currentBackdropPath = movies
    ? movies[currentBackdropIndex]?.backdrop_path
    : null;

  return (
    <YStack flex={1} justify="center" bg="$background">
      <LoginForm
        currentBackdropPath={currentBackdropPath}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        error={error}
        handleSubmitInput={handleSubmitInput}
        onRegisterPress={handleRegisterPress}
        loading={loading}
      />
    </YStack>
  );
};
export default LoginContainer;
