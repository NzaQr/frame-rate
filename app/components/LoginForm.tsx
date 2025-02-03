import { YStack, Input, Button, Text, Spinner } from "tamagui";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IMAGE_BASE_URL } from "constants/movie-types";
import { Film } from "@tamagui/lucide-icons";
import { Image } from "expo-image";

interface LoginFormProps {
  onRegisterPress: () => void;
  currentBackdropPath: string | null;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  error: string | null;
  handleSubmitInput: () => void;
}

const LoginForm = ({
  currentBackdropPath,
  email,
  setEmail,
  password,
  setPassword,
  error,
  handleSubmitInput,
  onRegisterPress,
  loading,
}: LoginFormProps) => {
  return (
    <>
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
        locations={[0, 0.4, 0.6, 0.8]}
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
            rounded="$2"
            height={50}
            style={styles.input}
            autoCapitalize="none"
          />

          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            rounded="$2"
            height={50}
            style={styles.input}
            autoCapitalize="none"
          />

          {error ? (
            <Text color="$red10" text="center">
              {error}
            </Text>
          ) : null}
        </YStack>

        <Button
          theme="accent"
          onPress={handleSubmitInput}
          width="100%"
          rounded="$2"
          height={50}
        >
          {loading ? <Spinner /> : <Text fontWeight="bold">Login</Text>}
        </Button>

        <Button
          variant="outlined"
          onPress={onRegisterPress}
          width="100%"
          rounded="$2"
          height={50}
          borderColor={"rgba(255, 255, 255, 0.3)"}
        >
          <Text fontWeight="bold">Create Account</Text>
        </Button>
      </YStack>
    </>
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
