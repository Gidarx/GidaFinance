import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    receitas: 4000,
    despesas: 2400,
  },
  {
    name: "Fev",
    receitas: 3000,
    despesas: 1398,
  },
  {
    name: "Mar",
    receitas: 2000,
    despesas: 9800,
  },
  {
    name: "Abr",
    receitas: 2780,
    despesas: 3908,
  },
  {
    name: "Mai",
    receitas: 1890,
    despesas: 4800,
  },
  {
    name: "Jun",
    receitas: 2390,
    despesas: 3800,
  },
];

export function MonthlyComparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparativo Mensal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="receitas" fill="#10B981" />
              <Bar dataKey="despesas" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}