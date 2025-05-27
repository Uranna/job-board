'use client';

import { useEffect, useState } from "react";
import { VacancyCard } from "./Card";
import { VacancyFilters } from "./VacancyFilters";
import { useQuery } from "@apollo/client";
import { VacanciesQueryResult } from "../model/types";
import { GET_VACANCIES } from "../api/vacancies";
import { useAtom } from "jotai";
import { filtersAtom } from "@/shared/store/filters";
import { Pagination } from "@/shared/ui/components/pagination";

export const VacanciesList = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filters] = useAtom(filtersAtom);

  const { loading, error, data, refetch } = useQuery<VacanciesQueryResult>(GET_VACANCIES, {
    variables: {
      page,
      perPage,
      filter: filters
    },
  });

  useEffect(() => {
    setPage(1);
  }, [filters]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const totalPages = Math.ceil((data?.vacancies.totalCount || 0) / perPage);

  return (
    <>
      <VacancyFilters />

      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <label className="whitespace-nowrap">На странице:</label>
          <select
            value={perPage}
            onChange={(e) => {
              const newPerPage = Number(e.target.value);
              setPerPage(newPerPage);
              setPage(1);
              refetch({
                page: 1,
                perPage: newPerPage,
                filter: filters
              });
            }}
            className="border text-sm rounded-lg block w-full py-1 px-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
          >
            {['5', '10', '20', '50'].map(value => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>

        <div>Найдено вакансий: {data?.vacancies.totalCount || 0}</div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.vacancies.items.map(vacancy => (
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

      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={totalPages}
      />
    </>
  );
};