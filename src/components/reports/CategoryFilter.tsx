import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const CATEGORIES = [
  "Alimentação",
  "Transporte",
  "Lazer",
  "Saúde",
  "Educação",
  "Moradia",
  "Outros",
];

export function CategoryFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selectedCategories.length === 0
            ? "Todas as categorias"
            : `${selectedCategories.length} categorias selecionadas`}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Categorias</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {CATEGORIES.map((category) => (
          <DropdownMenuCheckboxItem
            key={category}
            checked={selectedCategories.includes(category)}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedCategories([...selectedCategories, category]);
              } else {
                setSelectedCategories(
                  selectedCategories.filter((c) => c !== category)
                );
              }
            }}
          >
            {category}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}