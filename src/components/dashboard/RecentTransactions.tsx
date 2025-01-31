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
} from "lucide-react";
import { cn } from "@/lib/utils";

const transactions = [
  {
    id: 1,
    description: "Supermercado",
    amount: -350.0,
    date: "2024-03-20",
    type: "expense",
    category: "shopping",
  },
  {
    id: 2,
    description: "Salário",
    amount: 5000.0,
    date: "2024-03-19",
    type: "income",
    category: "salary",
  },
  {
    id: 3,
    description: "Netflix",
    amount: -39.9,
    date: "2024-03-18",
    type: "expense",
    category: "quick",
  },
];

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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}