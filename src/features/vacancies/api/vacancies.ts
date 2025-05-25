import { gql } from '@apollo/client';

export const GET_VACANCIES = gql`
  query GetVacancies(
    $filter: VacancyFilterInput
    $page: Int
    $perPage: Int
  ) {
    vacancies(filter: $filter, page: $page, perPage: $perPage) {
      items {
        id
        title
        company
        salary
        experience
        employmentType
      }
      totalCount
    }
  }
`;

export const GET_VACANCY = gql`
  query GetVacancy($id: ID!) {
    vacancy(id: $id) {
      id
      title
      description
      company
      salary
      createdAt
    }
  }
`;