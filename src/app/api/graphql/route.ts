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
    vacancies: () => vacanciesData.vacancies,
    vacancy: (_: any, { id }: { id: string }) => 
      vacanciesData.vacancies.find(v => v.id === id),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

export const GET = startServerAndCreateNextHandler(server);
export const POST = startServerAndCreateNextHandler(server);