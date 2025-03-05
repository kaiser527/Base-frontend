import { Button, Divider, Form, Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { callLogin } from "config/api";
import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import styles from "styles/auth.module.scss";
import { useAppSelector } from "@/redux/hook";
import { setUserLoginInfo } from "@/redux/slice/AccountSlice";
import ModalReactive from "@/components/client/modal/modal.reactive";
import { AntdContext } from "@/components/context/antd.context";
import ModalChangePassword from "@/components/client/modal/modal.change.password";
import { ACCOUNT_NOT_ACTIVATED } from "@/config/utils";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const { api, messageApi } = useContext(AntdContext)!;

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const callback = params?.get("callback");

  const showLoading = () => {
    setOpen(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const showChangePassword = () => {
    setChangePassword(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const onFinish = async (values: any) => {
    const { username, password } = values;
    setEmail("");
    setIsSubmit(true);
    const res = await callLogin(username, password);
    setIsSubmit(false);
    if (res?.data) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(setUserLoginInfo(res.data.user));
      messageApi.success(t("message.loginSucceed"));
      navigate(callback ? callback : "/");
    } else {
      setEmail(username);
      if (res?.message === ACCOUNT_NOT_ACTIVATED) {
        showLoading();
        return;
      }
      api.error({
        message: t("message.error"),
        description: t("message.description.loginError"),
      });
    }
  };

  return (
    <div className={styles["login-page"]}>
      <ModalReactive
        email={email}
        open={open}
        setOpen={setOpen}
        loading={loading}
      />
      <ModalChangePassword
        open={changePassword}
        setOpen={setChangePassword}
        loading={loading}
      />
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.wrapper}>
            <div className={styles.heading}>
              <h2 className={`${styles.text} ${styles["text-large"]}`}>
                {t("login.title")}
              </h2>
              <Divider />
            </div>
            <Form
              name="basic"
              // style={{ maxWidth: 600, margin: '0 auto' }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Email"
                name="username"
                rules={[
                  { required: true, message: "Email không được để trống!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label={t("login.password")}
                name="password"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  {t("login.button")}
                </Button>
              </Form.Item>
              <Divider>Or</Divider>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p className="text text-normal">
                  {t("login.dontHaveAccount")}
                  <span>
                    <Link to="/register"> {t("login.register")} </Link>
                  </span>
                </p>
                <p className="text text-normal">
                  <Link to="" onClick={showChangePassword}>
                    {" "}
                    {t("login.forgotPassword")}{" "}
                  </Link>
                </p>
              </div>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
