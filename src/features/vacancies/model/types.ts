export type Vacancy = {
  id: string;
  title: string;
  description: string;
  salary?: number;
  company: string;
  experience: string;
  employmentType: string;
  createdAt: string;
};

export type VacanciesQueryResult = {
  vacancies: Vacancy[];
};

export type VacancyQueryVariables = {
  id: string;
};