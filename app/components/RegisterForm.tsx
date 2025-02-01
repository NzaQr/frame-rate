import { IMAGE_BASE_URL } from "constants/movie-types";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";
import { YStack, Input, Button, Text, Image, Spinner } from "tamagui";

interface RegisterFormProps {
  onLoginPress: () => void;
  username: string;
  setUsername: (username: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  error: string | null;
  handleSubmitInput: () => void;
}

const RegisterForm = ({
  onLoginPress,
  email,
  setEmail,
  password,
  setPassword,
  error,
  handleSubmitInput,
  loading,
  username,
  setUsername,
}: RegisterFormProps) => {
  return (
    <YStack width="100%" height="100%">
      <Image
        source={{ uri: `${IMAGE_BASE_URL}/jK65srQczOKTpW62wPxwwKztGgE.jpg` }}
        style={styles.backdropImage}
      />

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
        <YStack space="$4" mb="$6" width="100%">
          <Input
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            rounded="$2"
            height={50}
            style={styles.input}
          />

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
            rounded="$2"
            height={50}
            style={styles.input}
            secureTextEntry
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
          {loading ? <Spinner /> : <Text fontWeight="bold">Register</Text>}
        </Button>

        <Button
          variant="outlined"
          onPress={onLoginPress}
          width="100%"
          rounded="$2"
          height={50}
        >
          <Text fontWeight="bold">Already have an account? Login</Text>
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
export default RegisterForm;
