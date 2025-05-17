import { gql } from '@apollo/client';

export const GET_VACANCIES = gql`
  query GetVacancies {
    vacancies {
      id
      title
      company
      salary
      experience
      employmentType
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