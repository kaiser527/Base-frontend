import {
  IBackendRes,
  IAccount,
  IGetAccount,
  IUser,
  ICode,
  IModelPaginate,
} from "@/types/backend";
import axios from "config/axios-customize";

export const callLogin = (username: string, password: string) => {
  return axios.post<IBackendRes<IAccount>>("/api/v1/auth/login", {
    username,
    password,
  });
};

export const callFetchAccount = () => {
  return axios.get<IBackendRes<IGetAccount>>("/api/v1/auth/account");
};

export const callRefreshToken = () => {
  return axios.get<IBackendRes<IAccount>>("/api/v1/auth/refresh");
};

export const callRegister = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  age: number,
  gender: string
) => {
  return axios.post<IBackendRes<IUser>>("/api/v1/auth/register", {
    firstName,
    lastName,
    email,
    password,
    age,
    gender,
  });
};

export const callLogout = () => {
  return axios.post<IBackendRes<string>>("/api/v1/auth/logout");
};

export const callCheckCode = (id: number, codeId: string) => {
  return axios.post<IBackendRes<ICode>>("/api/v1/auth/checkcode", {
    id,
    codeId,
  });
};

export const callResendCode = (id: number, email: string) => {
  return axios.post<IBackendRes<ICode>>("/api/v1/auth/resendcode", {
    id,
    email,
  });
};

export const callSendEmailForgotPassword = (email: string) => {
  return axios.post<IBackendRes<ICode>>("/api/v1/auth/retrypassword", {
    email,
  });
};

export const callChangePassword = (
  email: string,
  codeId: string,
  password: string,
  confirmPassword: string
) => {
  return axios.post<IBackendRes<string>>("/api/v1/auth/resetpassword", {
    email,
    codeId,
    password,
    confirmPassword,
  });
};

export const callCreateUser = (user: IUser) => {
  return axios.post<IBackendRes<IUser>>("/api/v1/users", { ...user });
};

export const callUpdateUser = (user: IUser, id: string) => {
  return axios.patch<IBackendRes<IUser>>(`/api/v1/users/${id}`, { ...user });
};

export const callDeleteUser = (id: string) => {
  return axios.delete<IBackendRes<IUser>>(`/api/v1/users/${id}`);
};

export const callFetchUser = (query: string) => {
  return axios.get<IBackendRes<IModelPaginate<IUser>>>(
    `/api/v1/users?${query}`
  );
};
