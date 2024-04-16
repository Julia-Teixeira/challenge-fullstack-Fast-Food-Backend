interface TPaginatedResult<T> {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number | null;
  data: T[];
}

type PaginateOptions = {
  page?: number | string;
  perPage?: number | string;
};

export { TPaginatedResult, PaginateOptions };
