import { Button } from "@/shared/ui/primitives/button";
import { DropdownMenu } from "@/shared/ui/primitives/dropdown";

export const FilterPanel = () => (
  <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <input
        type="text"
        placeholder="Должность или компания"
        className="border rounded-md px-4 py-2"
      />

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <Button variant="outline" className="w-full">
            Опыт работы
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Без опыта</DropdownMenu.Item>
          <DropdownMenu.Item>1-3 года</DropdownMenu.Item>
          <DropdownMenu.Item>3+ года</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <Button className="w-full">Применить фильтры</Button>
    </div>
  </div>
);