import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "./use-toast";

interface UserPreferences {
  id: string;
  userId: string;
  currency: string;
  hasCompletedOnboarding: boolean;
  monthlyBudget: number | null;
  defaultCategories: string[] | null;
}

export function useUserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setPreferences(null);
      setIsLoading(false);
      return;
    }

    async function loadPreferences() {
      try {
        const { data, error } = await supabase
          .from("UserPreferences")
          .select("*")
          .eq("userId", user.id)
          .single();

        if (error) throw error;
        setPreferences(data);
      } catch (error) {
        console.error("Error loading user preferences:", error);
        toast({
          title: "Erro ao carregar preferências",
          description: "Não foi possível carregar suas preferências. Tente novamente mais tarde.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadPreferences();
  }, [user]);

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user || !preferences) return;

    try {
      const { error } = await supabase
        .from("UserPreferences")
        .update(updates)
        .eq("userId", user.id);

      if (error) throw error;

      setPreferences({ ...preferences, ...updates });
      toast({
        title: "Preferências atualizadas",
        description: "Suas preferências foram salvas com sucesso!",
      });
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast({
        title: "Erro ao atualizar preferências",
        description: "Não foi possível salvar suas preferências. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return {
    preferences,
    isLoading,
    updatePreferences,
  };
}