import { ApolloServer } from '@apollo/server';
import { NextResponse } from 'next/server';
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
      _: any, // eslint-disable-line @typescript-eslint/no-explicit-any
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

      const startIndex = (page - 1) * perPage;
      const paginatedItems = filteredVacancies.slice(startIndex, startIndex + perPage);

      return {
        items: paginatedItems,
        totalCount: filteredVacancies.length
      };
    },
    vacancy: (_: any, { id }: { id: string }) => // eslint-disable-line @typescript-eslint/no-explicit-any
      vacanciesData.vacancies.find(v => v.id === id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

export async function POST(request: Request) {
  const body = await request.json();
  const response = await server.executeOperation(body);
  
  if (response.body.kind === 'single') {
    return NextResponse.json(response.body.singleResult);
  }
  
  return NextResponse.json(response);
}

export async function GET() {
  return new NextResponse(
    JSON.stringify({ error: 'GET requests not supported for GraphQL' }),
    {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}