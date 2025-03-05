export interface IBackendRes<T> {
  error?: string | string[];
  message: string;
  statusCode: number | string;
  data?: T;
}

export interface IModelPaginate<T> {
  meta: {
    current: number;
    pageSize: number;
    pages: number;
    total: number;
  };
  result: T[];
}

export interface ICode {
  userId: number;
  email: string;
  codeId: string;
  codeExpired: string;
}

export interface IAccount {
  access_token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: {
      id: string;
      name: string;
      permissions: {
        id: string;
        name: string;
        apiPath: string;
        method: string;
        module: string;
      }[];
    };
  };
}

export interface IUser {
  info: {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    age: number;
    gender: string;
    address: string;
  };
  role?: {
    id: string;
    name: string;
  };
}

export interface IGetAccount extends Omit<IAccount, "access_token"> {}
