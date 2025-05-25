import { atom } from "jotai";

export type VacancyFilters = {
  minSalary?: number;
  maxSalary?: number;
  experience: Array<string>;
  employmentType: Array<string>;
  search: string;
};

export const filtersAtom = atom<VacancyFilters>({
  minSalary: undefined,
  maxSalary: undefined,
  experience: [],
  employmentType: [],
  search: '',
});  