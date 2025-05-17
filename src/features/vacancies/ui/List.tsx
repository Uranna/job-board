'use client';

import { useQuery } from '@apollo/client';
import { GET_VACANCIES } from '../api/vacancies';
import { VacanciesQueryResult } from '../model/types';
import { VacancyCard } from './VacancyCard';

export const VacanciesList = () => {
  const { loading, error, data } = useQuery<VacanciesQueryResult>(GET_VACANCIES);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.vacancies.map((vacancy) => (
        <VacancyCard
          key={vacancy.id}
          title={vacancy.title}
          company={vacancy.company}
        />
      ))}
    </div>
  );
};