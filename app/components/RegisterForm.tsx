import { useState } from "react";
import { YStack, Input, Button, Text } from "tamagui";

type RegisterFormProps = {
  onSubmit: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  onLoginPress: () => void;
};

const RegisterForm = ({ onSubmit, onLoginPress }: RegisterFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!username || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError("");
    await onSubmit(username, email, password);
  };

  return (
    <YStack space="$4" width="100%" p="$4">
      <Text fontSize="$8" fontWeight="bold" text="center">
        Create Account
      </Text>

      <YStack space="$3" mb="$5">
        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? (
          <Text color="$red10" text="center">
            {error}
          </Text>
        ) : null}
      </YStack>

      <Button theme="accent" onPress={handleSubmit} width="100%">
        Register
      </Button>

      <Button variant="outlined" onPress={onLoginPress} width="100%">
        Already have an account? Login
      </Button>
    </YStack>
  );
};
export default RegisterForm;
