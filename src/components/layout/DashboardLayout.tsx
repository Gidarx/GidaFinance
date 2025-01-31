import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <h1 className="text-2xl font-bold">FinanceApp</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="container py-6">{children}</main>
    </div>
  );
}