interface Header {
  code: number;
  msg: string;
  token: string;
}

export interface ResponseType<T> {
  header: Header;
  payload: T;
}
