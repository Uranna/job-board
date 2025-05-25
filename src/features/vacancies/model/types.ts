export type VacancyFilterInput = {
  minSalary?: number;
  maxSalary?: number;
  experience?: Array<string>;
  employmentType?: Array<string>;
  search?: string;
};

export type VacanciesResult = {
  items: Array<{
    id: string;
    title: string;
    company: string;
    salary: number;
    experience: string;
    employmentType: string;
  }>;
  totalCount: number;
};

export type VacanciesQueryResult = {
  vacancies: VacanciesResult;
};

export type VacanciesQueryVariables = {
  filter?: VacancyFilterInput;
  page?: number;
  perPage?: number;
};