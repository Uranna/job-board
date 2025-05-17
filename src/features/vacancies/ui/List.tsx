'use client';

import { useQuery } from '@apollo/client';
import { GET_VACANCIES } from '../api/vacancies';
import { VacanciesQueryResult } from '../model/types';
import { VacancyCard } from "./Card";
import { FilterPanel } from "./Filters";
import { Pagination } from "@/shared/ui/components/pagination";
export const VacanciesList = () => {
  const { loading, error, data } = useQuery<VacanciesQueryResult>(GET_VACANCIES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <FilterPanel />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.vacancies.map((vacancy) => (
          <VacancyCard
            key={vacancy.id}
            title={vacancy.title}
            company={vacancy.company}
            salary={vacancy.salary}
            experience={vacancy.experience}
            employmentType={vacancy.employmentType}
          />
        ))}
      </div>

      <Pagination className="mt-8" />
    </div>
  );
};