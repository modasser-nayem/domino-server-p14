import { PaginatedResult } from "../types/pagination";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function paginate<T>({
  model,
  page = 1,
  limit = 10,
  where = {},
  select,
  sortBy = "created_at",
  sortOrder = "desc",
}: {
  model: any;
  page?: number;
  limit?: number;
  where?: any;
  select?: any;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}): Promise<PaginatedResult<T>> {
  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    model.findMany({
      where,
      select,
      skip,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    model.count({ where }),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
