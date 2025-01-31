import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  hideableValue?: boolean;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function DashboardCard({
  title,
  value,
  description,
  className,
  children,
  hideableValue = false,
  trend,
}: DashboardCardProps) {
  const [isValueHidden, setIsValueHidden] = useState(false);

  return (
    <Card className={cn("animate-fadeIn transition-all duration-200 hover:shadow-md", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {hideableValue && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setIsValueHidden(!isValueHidden)}
          >
            {isValueHidden ? (
              <EyeOffIcon className="h-4 w-4" />
            ) : (
              <EyeIcon className="h-4 w-4" />
            )}
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isValueHidden ? "••••••" : value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <p
            className={cn(
              "mt-2 text-sm font-medium",
              trend.isPositive ? "text-finance-income" : "text-finance-expense"
            )}
          >
            {trend.isPositive ? "+" : "-"}
            {trend.value}%
          </p>
        )}
        {children}
      </CardContent>
    </Card>
  );
}