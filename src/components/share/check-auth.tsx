import { useAppSelector } from "@/redux/hook";
import React from "react";
import { Navigate } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
}

const CheckAuth = (props: IProps) => {
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );

  if (isAuthenticated) return <Navigate to="/" />;

  return <>{props.children}</>;
};

export default CheckAuth;
