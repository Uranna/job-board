import React, { FC, PropsWithChildren } from "react";

type VacancyCardProps = PropsWithChildren & {
  title: string;
  company: string;
};

export const VacancyCard: FC<VacancyCardProps> = props => {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>{props.company}</p>
    </div>
  );
};