import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("financeAppUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      const savedUser = localStorage.getItem("financeAppUser");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        if (user.email === email) {
          setUser(user);
          localStorage.setItem("financeAppUser", JSON.stringify(user));
          toast({
            title: "Login realizado com sucesso!",
            description: "Bem-vindo de volta.",
          });
          navigate("/dashboard");
          return;
        }
      }
      throw new Error("Credenciais inválidas");
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: "Credenciais inválidas. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const register = async (email: string, password: string) => {
    try {
      // In a real app, this would be an API call
      const newUser = {
        id: crypto.randomUUID(),
        email,
      };
      setUser(newUser);
      localStorage.setItem("financeAppUser", JSON.stringify(newUser));
      toast({
        title: "Registro realizado com sucesso!",
        description: "Sua conta foi criada.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Erro ao criar conta",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("financeAppUser");
    setUser(null);
    navigate("/login");
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}