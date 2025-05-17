import { Button } from "@/shared/ui/primitives/button";
import { Badge } from "@/shared/ui/components/badge";
import { FC, PropsWithChildren } from "react";

type VacancyCardProps = PropsWithChildren & {
  title: string;
  company: string;
  salary?: number;
  experience: string;
  employmentType: string;
};

export const VacancyCard: FC<VacancyCardProps> = ({
  title,
  company,
  salary,
  experience,
  employmentType,
}) => (
  <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600 mt-1">{company}</p>
      </div>
      {salary && (
        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
          {salary.toLocaleString()} ₽
        </span>
      )}
    </div>

    <div className="flex gap-2 mt-4">
      <Badge>{experience}</Badge>
      <Badge>{employmentType}</Badge>
    </div>

    <Button variant="outline" size="sm" className="mt-6 w-full">
      Подробнее
    </Button>
  </div>
);