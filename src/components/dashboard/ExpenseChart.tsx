import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useTransactions } from "@/hooks/use-transactions";

const COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#6B7280", "#EC4899", "#8B5CF6", "#EF4444", "#71717A"];

export function ExpenseChart() {
  const { transactions } = useTransactions();

  // Calculate expenses by category
  const expensesByCategory = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, transaction) => {
      const category = transaction.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += transaction.amount;
      return acc;
    }, {} as Record<string, number>);

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  if (data.length === 0) {
    return (
      <Card className="col-span-3 animate-fadeIn">
        <CardHeader>
          <CardTitle>Despesas por Categoria</CardTitle>
        </CardHeader>
        <CardContent className="pl-2 flex items-center justify-center h-[300px] text-muted-foreground">
          Nenhuma despesa registrada ainda
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-3 animate-fadeIn">
      <CardHeader>
        <CardTitle>Despesas por Categoria</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) =>
                  value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                }
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}