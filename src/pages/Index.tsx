import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { useTransactions } from "@/hooks/use-transactions";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { preferences, isLoading: preferencesLoading } = useUserPreferences();
  const { totals, isLoading: transactionsLoading } = useTransactions();

  const isLoading = preferencesLoading || transactionsLoading;

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="hidden sm:block">
          <TransactionForm />
        </div>
      </div>

      {!preferencesLoading && preferences && !preferences.hasCompletedOnboarding && (
        <Alert className="mb-6">
          <AlertTitle>Bem-vindo ao FinanceApp! 👋</AlertTitle>
          <AlertDescription>
            Para começar, adicione sua primeira transação usando o botão "+" no canto superior direito.
            Você também pode personalizar suas categorias e preferências nas configurações.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
        <DashboardCard
          title="Saldo Total"
          value={isLoading ? "Carregando..." : totals.balance.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
          description="Saldo atual da sua conta"
          className="animate-slideUp"
          hideableValue
        />
        <DashboardCard
          title="Receitas (Mês Atual)"
          value={isLoading ? "Carregando..." : totals.income.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
          description="Total de receitas no mês"
          className="animate-slideUp [animation-delay:100ms]"
        />
        <DashboardCard
          title="Despesas (Mês Atual)"
          value={isLoading ? "Carregando..." : totals.expenses.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
          description="Total de despesas no mês"
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