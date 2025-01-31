import { useState, useEffect } from "react";
import { YStack, Input, Button, Text } from "tamagui";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useQuery } from "@tanstack/react-query";
import { movieApi } from "services/movieApi";
import { IMAGE_BASE_URL } from "constants/movie-types";
import { Film } from "@tamagui/lucide-icons";
import { Image } from "expo-image";
type LoginFormProps = {
  onSubmit: (email: string, password: string) => Promise<void>;
  onRegisterPress: () => void;
};

const LoginForm = ({ onSubmit, onRegisterPress }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [currentBackdropIndex, setCurrentBackdropIndex] = useState(0);

  const { data: movies, isLoading } = useQuery({
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

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    await onSubmit(email, password);
  };

  const currentBackdropPath = movies
    ? movies[currentBackdropIndex]?.backdrop_path
    : null;
  console.log(`${IMAGE_BASE_URL}${currentBackdropPath}`);

  return (
    <YStack width="100%" height="100%">
      {currentBackdropPath && (
        <Image
          source={{ uri: `${IMAGE_BASE_URL}${currentBackdropPath}` }}
          style={styles.backdropImage}
          transition={500}
        />
      )}

      <LinearGradient
        colors={[
          "rgba(0,0,0,0)",
          "rgba(0,0,0,0.80)",
          "rgba(0,0,0,1)",
          "#000000",
        ]}
        locations={[0, 0.4, 0.6, 0.75, 0.85, 1]}
        style={styles.gradient}
      />

      <YStack
        space="$4"
        width="100%"
        p="$4"
        items="center"
        justify="flex-end"
        flex={1}
        style={styles.content}
      >
        <Film
          size="$10"
          color={"$red10"}
          style={{ transform: [{ rotate: "45deg" }] }}
          mb="$5"
        />
        <YStack space="$4" mb="$6" width="100%">
          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            rounded="$2"
            height={50}
            style={styles.input}
          />

          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            rounded="$2"
            height={50}
            style={styles.input}
          />

          {error ? (
            <Text color="$red10" text="center">
              {error}
            </Text>
          ) : null}
        </YStack>

        <Button
          theme="accent"
          onPress={handleSubmit}
          width="100%"
          rounded="$2"
          height={50}
        >
          Login
        </Button>

        <Button
          variant="outlined"
          onPress={onRegisterPress}
          width="100%"
          rounded="$2"
          height={50}
          borderColor={"rgba(255, 255, 255, 0.3)"}
        >
          Create Account
        </Button>
      </YStack>
    </YStack>
  );
};

const styles = StyleSheet.create({
  backdropImage: {
    position: "absolute",
    width: "100%",
    height: "55%",
    resizeMode: "cover",
    top: 0,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  input: {
    paddingHorizontal: 16,
  },
});

export default LoginForm;
