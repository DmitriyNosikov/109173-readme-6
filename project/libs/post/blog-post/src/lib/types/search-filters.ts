import { Prisma } from '@prisma/client';

export type SearchFilters = {
  where: Prisma.PostWhereInput,
  orderBy: Prisma.PostOrderByWithRelationInput
};
