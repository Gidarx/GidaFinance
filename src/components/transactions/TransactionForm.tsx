import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "lucide-react";
import { Transaction, INCOME_CATEGORIES, EXPENSE_CATEGORIES, useTransactions } from "@/hooks/use-transactions";
import { toast } from "@/hooks/use-toast";

interface TransactionFormProps {
  transaction?: Transaction;
  onClose?: () => void;
}

export function TransactionForm({ transaction, onClose }: TransactionFormProps) {
  const [open, setOpen] = useState(false);
  const { addTransaction, updateTransaction } = useTransactions();
  const [formData, setFormData] = useState<Partial<Transaction>>(
    transaction || {
      description: "",
      amount: 0,
      type: "expense",
      category: "",
      date: new Date().toISOString().split("T")[0],
    }
  );

  const handleSubmit = () => {
    if (!formData.description || !formData.amount || !formData.type || !formData.category) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    if (formData.type === "income" && Number(formData.amount) < 0) {
      toast({
        title: "Valor inválido",
        description: "Receitas não podem ter valores negativos.",
        variant: "destructive",
      });
      return;
    }

    if (transaction?.id) {
      updateTransaction(transaction.id, formData as Transaction);
    } else {
      addTransaction(formData as Omit<Transaction, "id">);
    }

    setOpen(false);
    onClose?.();
  };

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          {transaction ? "Editar Transação" : "Nova Transação"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{transaction ? "Editar Transação" : "Nova Transação"}</DialogTitle>
          <DialogDescription>
            Preencha os dados da transação abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">Valor</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: Number(e.target.value) })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Tipo</Label>
            <Select
              value={formData.type}
              onValueChange={(value: "income" | "expense") =>
                setFormData({ ...formData, type: value, category: "" })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Receita</SelectItem>
                <SelectItem value="expense">Despesa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                {(formData.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map(
                  (category) => (
                    <SelectItem key={category} value={category}>
                      {category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {transaction ? "Salvar" : "Adicionar"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}