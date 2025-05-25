import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { readFileSync } from 'fs';
import path from 'path';
import vacanciesData from '@/shared/lib/testData/vacancies.json';

const typeDefs = readFileSync(
  path.join(process.cwd(), 'src/shared/api/graphql/schema.gql'),
  'utf-8'
);

const resolvers = {
  Query: {
    vacancies: (
      _: any,
      { filter, page = 1, perPage = 10 }: {
        filter?: {
          minSalary?: number;
          maxSalary?: number;
          experience?: string[];
          employmentType?: string[];
          search?: string;
        };
        page?: number;
        perPage?: number;
      }
    ) => {
      let filteredVacancies = [...vacanciesData.vacancies];

      // Применяем фильтры
      if (filter) {
        const { maxSalary, minSalary, employmentType, experience, search } = filter;

        if (typeof minSalary === 'number') {
          filteredVacancies = filteredVacancies.filter(v => v.salary >= minSalary);
        }

        if (typeof maxSalary === 'number') {
          filteredVacancies = filteredVacancies.filter(v => v.salary <= maxSalary);
        }

        if (experience?.length) {
          filteredVacancies = filteredVacancies.filter(v =>
            experience.includes(v.experience)
          );
        }

        if (employmentType?.length) {
          filteredVacancies = filteredVacancies.filter(v =>
            employmentType.includes(v.employmentType)
          );
        }

        if (search) {
          const searchLower = search.toLowerCase();
          filteredVacancies = filteredVacancies.filter(v =>
            v.title.toLowerCase().includes(searchLower) ||
            v.company.toLowerCase().includes(searchLower) ||
            v.description.toLowerCase().includes(searchLower)
          );
        }
      }

      // Применяем пагинацию
      const startIndex = (page - 1) * perPage;
      const paginatedItems = filteredVacancies.slice(startIndex, startIndex + perPage);

      return {
        items: paginatedItems,
        totalCount: filteredVacancies.length
      };
    },
    vacancy: (_: any, { id }: { id: string }) =>
      vacanciesData.vacancies.find(v => v.id === id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export const GET = startServerAndCreateNextHandler(server);
export const POST = startServerAndCreateNextHandler(server);