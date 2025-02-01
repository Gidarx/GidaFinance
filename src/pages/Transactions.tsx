import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Transactions = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de Transações</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTransactions fullPage />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;