import { useRouter } from "expo-router";
import RegisterForm from "../components/RegisterForm";
import { useAuthStore } from "contexts/authStore";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";

const RegisterContainer = () => {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginPress = () => {
    router.back();
  };

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

  const handleSubmitInput = async () => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    await handleSubmit(username, email, password);
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flexGrow: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <RegisterForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          error={error}
          handleSubmitInput={handleSubmitInput}
          loading={loading}
          onLoginPress={handleLoginPress}
          username={username}
          setUsername={setUsername}
        />
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};
export default RegisterContainer;
