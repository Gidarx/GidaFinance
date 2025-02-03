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

const DEFAULT_PREFERENCES: Omit<UserPreferences, "id" | "userId"> = {
  currency: "BRL",
  hasCompletedOnboarding: false,
  monthlyBudget: null,
  defaultCategories: ["Alimentação", "Transporte", "Moradia", "Lazer", "Saúde"],
};

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
        console.log("Loading preferences for user:", user.id);
        
        const { data, error } = await supabase
          .from("UserPreferences")
          .select("*")
          .eq("userId", user.id)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          console.log("No preferences found, creating defaults...");
          const newPreferences = {
            ...DEFAULT_PREFERENCES,
            userId: user.id,
          };

          const { data: insertedData, error: insertError } = await supabase
            .from("UserPreferences")
            .insert([newPreferences])
            .select()
            .single();

          if (insertError) throw insertError;

          console.log("Default preferences created successfully");
          setPreferences(insertedData);
        } else {
          console.log("Existing preferences found");
          setPreferences(data);
        }
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
      console.log("Updating preferences:", updates);
      
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