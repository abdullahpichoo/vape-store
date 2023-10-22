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
  totalOrders: number;
  nextPage?: number;
  prevPage?: number;
}
