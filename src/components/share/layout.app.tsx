import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setRefreshTokenAction } from "@/redux/slice/AccountSlice";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AntdContext } from "../context/antd.context";

interface IProps {
  children: React.ReactNode;
}

const LayoutApp = (props: IProps) => {
  const { messageApi } = useContext(AntdContext)!;

  const isRefreshToken = useAppSelector(
    (state) => state.account.isRefreshToken
  );
  const errorRefreshToken = useAppSelector(
    (state) => state.account.errorRefreshToken
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //handle refresh token error
  useEffect(() => {
    if (isRefreshToken === true) {
      localStorage.removeItem("access_token");
      messageApi.error(errorRefreshToken);
      dispatch(setRefreshTokenAction({ status: false, message: "" }));
      navigate("/login");
    }
  }, [isRefreshToken]);

  return <>{props.children}</>;
};

export default LayoutApp;
