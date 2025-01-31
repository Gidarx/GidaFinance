import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="hidden sm:block">
          <TransactionForm />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
        <DashboardCard
          title="Saldo Total"
          value="R$ 4.610,10"
          description="Atualizado há 2 minutos"
          className="animate-slideUp"
          hideableValue
        />
        <DashboardCard
          title="Receitas (Mês Atual)"
          value="R$ 5.000,00"
          description="em relação ao mês anterior"
          trend={{ value: 12, isPositive: true }}
          className="animate-slideUp [animation-delay:100ms]"
        />
        <DashboardCard
          title="Despesas (Mês Atual)"
          value="R$ 389,90"
          description="em relação ao mês anterior"
          trend={{ value: 8, isPositive: false }}
          className="animate-slideUp [animation-delay:200ms]"
        />
        <ExpenseChart />
        <RecentTransactions />
      </div>

      {/* Mobile FAB */}
      <Button
        size="icon"
        className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg sm:hidden"
      >
        <PlusIcon className="h-6 w-6" />
      </Button>
    </DashboardLayout>
  );
};

export default Index;