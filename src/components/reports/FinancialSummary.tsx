import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

export function FinancialSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receitas</CardTitle>
          <ArrowUpIcon className="h-4 w-4 text-finance-income" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 5.231,89</div>
          <p className="text-xs text-muted-foreground">
            +20.1% em relação ao período anterior
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas</CardTitle>
          <ArrowDownIcon className="h-4 w-4 text-finance-expense" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 3.542,67</div>
          <p className="text-xs text-muted-foreground">
            -12.5% em relação ao período anterior
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo</CardTitle>
          <ArrowUpIcon className="h-4 w-4 text-finance-income" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">R$ 1.689,22</div>
          <p className="text-xs text-muted-foreground">
            +8.2% em relação ao período anterior
          </p>
        </CardContent>
      </Card>
    </div>
  );
}