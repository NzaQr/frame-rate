import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => void;
  initializeAuth: () => Promise<void>;
};

let users: (User & { password: string })[] = [];

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,

  initializeAuth: async () => {
    const storedUser = await AsyncStorage.getItem("user");
    if (storedUser) {
      set({ user: JSON.parse(storedUser), isAuthenticated: true });
    }
  },

  login: async (email: string, password: string) => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      await AsyncStorage.setItem("user", JSON.stringify(userWithoutPassword));
      set({ user: userWithoutPassword, isAuthenticated: true });
      return true;
    }
    return false;
  },

  register: async (username: string, email: string, password: string) => {
    if (users.some((u) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password,
    };

    users.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    await AsyncStorage.setItem("user", JSON.stringify(userWithoutPassword));
    set({ user: userWithoutPassword, isAuthenticated: true });
    return true;
  },

  logout: async () => {
    await AsyncStorage.removeItem("user");
    set({ user: null, isAuthenticated: false });
  },
}));
