import { supabase } from "services/supabaseClient";
import { create } from "zustand";

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<boolean>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  initializeAuth: async () => {
    try {
      // 1. Obtener la sesión actual
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      // 2. Configurar el listener para cambios en la sesión
      supabase.auth.onAuthStateChange(async (event, session) => {
        console.log("Auth state changed:", event);
        if (session) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", session.user.id)
            .single();

          set({
            user: {
              id: session.user.id,
              email: session.user.email!,
              username: profile?.username || "",
            },
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      });

      // 3. Si hay una sesión activa, cargar los datos del usuario
      if (session) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", session.user.id)
          .single();

        set({
          user: {
            id: session.user.id,
            email: session.user.email!,
            username: profile?.username || "",
          },
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      set({ isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", session.user.id)
          .single();

        set({
          user: {
            id: session.user.id,
            email: session.user.email!,
            username: profile?.username || "",
          },
          isAuthenticated: true,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  },

  register: async (username: string, email: string, password: string) => {
    try {
      // 1. Crear el usuario en auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username, // Esto se almacena en raw_user_meta_data
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("No user data returned");

      // 2. Esperar un momento para asegurar que el usuario se creó
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 3. Actualizar el estado
      set({
        user: {
          id: authData.user.id,
          email: authData.user.email!,
          username,
        },
        isAuthenticated: true,
      });

      return true;
    } catch (error) {
      console.error("Error registering:", error);
      return false;
    }
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null, isAuthenticated: false });
  },
}));
