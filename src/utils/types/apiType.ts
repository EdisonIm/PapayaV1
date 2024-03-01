export type tApidefault<T> = {
  id: number;
  statusCode: number;
  message: string;
  data: {
    data: T;
  };
  error: string;
};
export type tApiPostDefault = {
  id: number;
  statusCode: number;
  message: string;
  data: any;
  error: string;
};
