export interface Response<T> {
  success: boolean;
  status: number;
  message: string;
  payLoad: T;
}