import { Button, Divider, Form, Input, Select } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { callRegister } from "config/api";
import styles from "styles/auth.module.scss";
import { IUser } from "@/types/backend";
import { AntdContext } from "@/components/context/antd.context";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const RegisterPage = () => {
  const { api, messageApi } = useContext(AntdContext)!;

  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values: IUser) => {
    const { firstName, lastName, email, password, age, gender } = values;
    setIsSubmit(true);
    const res = await callRegister(
      firstName,
      lastName,
      email,
      password as string,
      +age,
      gender
    );
    setIsSubmit(false);
    if (res?.data?.id) {
      navigate(`/verify/${res?.data?.id}`);
      messageApi.success(t("message.resgisterSucceed"));
    } else {
      api.error({
        message: t("message.error"),
        description: t("message.description.registerError"),
      });
    }
  };

  return (
    <div className={styles["register-page"]}>
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.wrapper}>
            <div className={styles.heading}>
              <h2 className={`${styles.text} ${styles["text-large"]}`}>
                {t("register.title")}
              </h2>
              <Divider />
            </div>
            <Form<IUser>
              name="basic"
              // style={{ maxWidth: 600, margin: '0 auto' }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <div style={{ display: "flex", gap: "20px" }}>
                <Form.Item
                  labelCol={{ span: 24 }} //whole column
                  label={t("register.firstName")}
                  name="firstName"
                  rules={[
                    { required: true, message: "Họ không được để trống!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 24 }} //whole column
                  label={t("register.lastName")}
                  name="lastName"
                  rules={[
                    { required: true, message: "Tên không được để trống!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email không được để trống!" },
                ]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label={t("register.password")}
                name="password"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống!" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }} //whole column
                label={t("register.age")}
                name="age"
                rules={[
                  { required: true, message: "Tuổi không được để trống!" },
                ]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }} //whole column
                name="gender"
                label={t("register.gender.title")}
                rules={[
                  { required: true, message: "Giới tính không được để trống!" },
                ]}
              >
                <Select
                  // placeholder="Select a option and change input text above"
                  // onChange={onGenderChange}
                  allowClear
                >
                  <Option value="male">{t("register.gender.male")}</Option>
                  <Option value="female">{t("register.gender.female")}</Option>
                  <Option value="other">{t("register.gender.other")}</Option>
                </Select>
              </Form.Item>

              <Form.Item
              // wrapperCol={{ offset: 6, span: 16 }}
              >
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  {t("register.button")}
                </Button>
              </Form.Item>
              <Divider> Or </Divider>
              <p className="text text-normal">
                {t("register.haveAnAccount")}
                <span>
                  <Link to="/login"> {t("register.login")} </Link>
                </span>
                <span></span>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
