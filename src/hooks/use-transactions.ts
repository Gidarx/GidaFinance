import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  type: "income" | "expense";
  category: string;
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

const STORAGE_KEY = "transactions";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTransactions(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to parse stored transactions:", error);
      }
    }
  }, []);

  const saveTransactions = (newTransactions: Transaction[]) => {
    setTransactions(newTransactions);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTransactions));
  };

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    
    saveTransactions([...transactions, newTransaction]);
    toast({
      title: "Transação adicionada",
      description: "A transação foi salva com sucesso!",
    });
  };

  const updateTransaction = (id: string, data: Partial<Transaction>) => {
    const updated = transactions.map((t) =>
      t.id === id ? { ...t, ...data } : t
    );
    saveTransactions(updated);
    toast({
      title: "Transação atualizada",
      description: "As alterações foram salvas com sucesso!",
    });
  };

  const deleteTransaction = (id: string) => {
    saveTransactions(transactions.filter((t) => t.id !== id));
    toast({
      title: "Transação excluída",
      description: "A transação foi removida com sucesso!",
    });
  };

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
}