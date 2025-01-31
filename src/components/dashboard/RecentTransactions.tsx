import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ShoppingCartIcon,
  HomeIcon,
  BriefcaseIcon,
  ZapIcon,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Transaction, useTransactions } from "@/hooks/use-transactions";
import { TransactionForm } from "@/components/transactions/TransactionForm";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "shopping":
      return <ShoppingCartIcon className="h-4 w-4" />;
    case "home":
      return <HomeIcon className="h-4 w-4" />;
    case "salary":
      return <BriefcaseIcon className="h-4 w-4" />;
    case "quick":
      return <ZapIcon className="h-4 w-4" />;
    default:
      return null;
  }
};

export function RecentTransactions() {
  const { transactions, deleteTransaction } = useTransactions();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  return (
    <Card className="col-span-3 animate-fadeIn">
      <CardHeader>
        <CardTitle>Transações Recentes</CardTitle>
      </CardHeader>
      <CardContent className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Descrição</TableHead>
              <TableHead className="hidden sm:table-cell">Data</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              <TableHead className="w-[100px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {transaction.type === "expense" ? (
                      <ArrowDownIcon className="h-4 w-4 text-finance-expense" />
                    ) : (
                      <ArrowUpIcon className="h-4 w-4 text-finance-income" />
                    )}
                    {getCategoryIcon(transaction.category)}
                    {transaction.description}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{transaction.date}</TableCell>
                <TableCell
                  className={cn(
                    "text-right",
                    transaction.type === "expense"
                      ? "text-finance-expense"
                      : "text-finance-income"
                  )}
                >
                  {transaction.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingTransaction(transaction)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteTransaction(transaction.id)}
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {editingTransaction && (
        <TransactionForm
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      )}
    </Card>
  );
}