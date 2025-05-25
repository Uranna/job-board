import { Button } from "@/shared/ui/primitives/button";
import { Badge } from "@/shared/ui/components/badge";
import { FC, PropsWithChildren } from "react";
import { userAtom } from "@/shared/store/userInfo";
import { useAtom } from "jotai";
import { Role } from "@/shared/lib/users";

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
}) => {
  const [user] = useAtom(userAtom);

  return (
    <div className="flex flex-col bg-gray-800 border border-blue-500 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex-1">

        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-400 mt-1">{company}</p>
          </div>
          {salary && (
            <span className="bg-blue-500 text-blue-50 px-3 py-1 rounded-full text-sm whitespace-nowrap">
              {`${salary.toLocaleString()} ₽`}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-4">
          <Badge>{experience}</Badge>
          <Badge>{employmentType}</Badge>
        </div>

      </div>
      {user?.role?.includes(Role.USER) && <Button variant="primary" className="mt-6 w-full">
        Отозваться
      </Button>}
    </div>
  )
};