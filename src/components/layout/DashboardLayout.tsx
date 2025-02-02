import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MenuIcon, HomeIcon, PlusIcon, BarChart3Icon, Settings2Icon, LogOutIcon, WalletIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleTransactionsClick = () => {
    if (!user) {
      toast({
        title: "Acesso Restrito",
        description: "Faça login para acessar as transações.",
        variant: "destructive",
      });
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r bg-background transition-transform lg:translate-x-0",
          sidebarOpen && "translate-x-0"
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-2xl font-bold">FinanceApp</h1>
        </div>
        <nav className="space-y-1 p-4">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start" 
            asChild
            onClick={handleTransactionsClick}
          >
            <Link to="/transactions">
              <WalletIcon className="mr-2 h-4 w-4" />
              Transações
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={logout}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b bg-background">
          <div className="flex h-16 items-center gap-4 px-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
            <div className="ml-auto flex items-center gap-4">
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="container py-6">{children}</main>

        <nav className="fixed bottom-0 left-0 z-40 w-full border-t bg-background lg:hidden">
          <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <HomeIcon className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild onClick={handleTransactionsClick}>
              <Link to="/transactions">
                <WalletIcon className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="secondary" size="icon" className="rounded-full">
              <PlusIcon className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings2Icon className="h-5 w-5" />
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}