import { atom } from "jotai";

export type VacancyFilters = {
  minSalary?: number;
  maxSalary?: number;
  experience: Array<string>;
  employmentType: Array<string>;
  search: string;
};

export const initialFiltersAtom = {
  minSalary: undefined,
  maxSalary: undefined,
  experience: [],
  employmentType: [],
  search: '',
}

export const filtersAtom = atom<VacancyFilters>(initialFiltersAtom);  