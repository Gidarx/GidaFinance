import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  category: string;
  accountId?: string;
}

export const INCOME_CATEGORIES = [
  "salary",
  "freelance",
  "investments",
  "rent",
  "other_income",
] as const;

export const EXPENSE_CATEGORIES = [
  "food",
  "leisure",
  "utilities",
  "transport",
  "health",
  "education",
  "housing",
  "other_expenses",
] as const;

// Helper function to transform Supabase transaction type to our app's type
const transformSupabaseTransaction = (transaction: any): Transaction => ({
  ...transaction,
  type: transaction.type.toLowerCase() as "income" | "expense"
});

// Helper function to transform our app's type to Supabase transaction type
const transformToSupabaseTransaction = (transaction: Partial<Transaction>) => ({
  ...transaction,
  type: transaction.type?.toUpperCase()
});

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setTransactions([]);
      setIsLoading(false);
      return;
    }

    // Initial fetch
    async function fetchTransactions() {
      try {
        const { data, error } = await supabase
          .from("Transaction")
          .select("*")
          .eq("userId", user.id)
          .order("date", { ascending: false });

        if (error) throw error;
        setTransactions(data ? data.map(transformSupabaseTransaction) : []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        toast({
          title: "Erro ao carregar transações",
          description: "Não foi possível carregar suas transações. Tente novamente mais tarde.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchTransactions();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'Transaction',
          filter: `userId=eq.${user.id}`,
        },
        async (payload) => {
          console.log('Real-time update:', payload);
          // Refresh transactions after any change
          const { data, error } = await supabase
            .from("Transaction")
            .select("*")
            .eq("userId", user.id)
            .order("date", { ascending: false });

          if (!error && data) {
            setTransactions(data.map(transformSupabaseTransaction));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const addTransaction = async (transaction: Omit<Transaction, "id">) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from("Transaction")
        .insert([{
          ...transformToSupabaseTransaction(transaction),
          userId: user.id,
          accountId: transaction.accountId || user.id, // Fallback to userId if no accountId
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }]);

      if (error) throw error;

      toast({
        title: "Transação adicionada",
        description: "A transação foi salva com sucesso!",
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast({
        title: "Erro ao adicionar transação",
        description: "Não foi possível salvar a transação. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const updateTransaction = async (id: string, data: Partial<Transaction>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("Transaction")
        .update({
          ...transformToSupabaseTransaction(data),
          updatedAt: new Date().toISOString()
        })
        .eq("id", id)
        .eq("userId", user.id);

      if (error) throw error;

      toast({
        title: "Transação atualizada",
        description: "As alterações foram salvas com sucesso!",
      });
    } catch (error) {
      console.error("Error updating transaction:", error);
      toast({
        title: "Erro ao atualizar transação",
        description: "Não foi possível atualizar a transação. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  const deleteTransaction = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("Transaction")
        .delete()
        .eq("id", id)
        .eq("userId", user.id);

      if (error) throw error;

      toast({
        title: "Transação excluída",
        description: "A transação foi removida com sucesso!",
      });
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast({
        title: "Erro ao excluir transação",
        description: "Não foi possível excluir a transação. Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  // Calculate totals
  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.amount;
      } else {
        acc.expenses += transaction.amount;
      }
      acc.balance = acc.income - acc.expenses;
      return acc;
    },
    { income: 0, expenses: 0, balance: 0 }
  );

  return {
    transactions,
    isLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    totals,
  };
}