export type TMetaData = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResult<T> {
  data: T[];
  meta: TMetaData;
}
