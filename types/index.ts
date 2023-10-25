export interface Response<T> {
  success: boolean;
  status: number;
  message: string;
  pagination?: Pagination;
  payLoad?: T | T[] | string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  nextPage?: number;
  prevPage?: number;
}

export interface SearchParams {
  [key: string]: string | undefined;
  pageNumber?: string;
  pageSize?: string;
  sortBy?: string;
  orderBy?: string;
  searchBy?: string;
  search?: string;
}
