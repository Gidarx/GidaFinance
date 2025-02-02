import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/reports/DateRangePicker";
import { TransactionTypeFilter } from "@/components/reports/TransactionTypeFilter";
import { CategoryFilter } from "@/components/reports/CategoryFilter";
import { FinancialSummary } from "@/components/reports/FinancialSummary";
import { TransactionTrends } from "@/components/reports/TransactionTrends";
import { CategoryDistribution } from "@/components/reports/CategoryDistribution";
import { MonthlyComparison } from "@/components/reports/MonthlyComparison";

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Relatórios e Análises</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <DatePickerWithRange />
              <TransactionTypeFilter />
              <CategoryFilter />
            </div>
          </CardContent>
        </Card>

        <FinancialSummary />

        <div className="grid gap-4 md:grid-cols-2">
          <TransactionTrends />
          <CategoryDistribution />
        </div>

        <MonthlyComparison />
      </div>
    </DashboardLayout>
  );
};

export default Reports;