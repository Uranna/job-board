import { useApolloClient } from '@apollo/client';
import { GET_VACANCIES } from '../api/vacancies';
import { VacanciesQueryResult } from '../model/types';

export const useVacancies = () => {
  const client = useApolloClient();
  
  return async () => {
    const { data } = await client.query<VacanciesQueryResult>({
      query: GET_VACANCIES,
    });
    return data;
  };
};