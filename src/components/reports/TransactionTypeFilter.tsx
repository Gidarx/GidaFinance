import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function TransactionTypeFilter() {
  const [transactionType, setTransactionType] = useState("all");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {transactionType === "all"
            ? "Todos os tipos"
            : transactionType === "income"
            ? "Receitas"
            : "Despesas"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Tipo de Transação</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={transactionType}
          onValueChange={setTransactionType}
        >
          <DropdownMenuRadioItem value="all">
            Todos os tipos
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="income">Receitas</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="expense">Despesas</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}