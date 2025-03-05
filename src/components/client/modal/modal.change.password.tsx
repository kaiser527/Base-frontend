import { Button, Form, Input, Modal, Steps } from "antd";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { callChangePassword, callSendEmailForgotPassword } from "@/config/api";
import { AntdContext } from "../../context/antd.context";
import { useTranslation } from "react-i18next";

type FieldType = {
  codeId: string;
  password: string;
  confirmPassword: string;
  email: string;
};

const ModalChangePassword = (props: any) => {
  const { open, setOpen, loading } = props;

  const { api, messageApi } = useContext(AntdContext)!;

  const { t } = useTranslation();

  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [current, setCurrent] = useState<number>(0);
  const [countDown, setCountDown] = useState<number>(0);
  const [isSending, setIsSending] = useState<boolean>(false);

  useEffect(() => {
    if (countDown === 0) {
      setIsSending(false);
      return;
    }
    const timer = setInterval(() => {
      setIsSending(true);
      setCountDown(countDown - 1);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [countDown]);

  const onFinish = async (values: any) => {
    setCountDown(5);
    const { email } = values;
    const res = await callSendEmailForgotPassword(email);
    if (res?.data) {
      messageApi.success(t("login.modal.message.description.validEmail"));
      setUserEmail(res.data?.email);
      setCurrent(1);
    } else {
      api.error({
        message: t("login.modal.message.error"),
        description: t("login.modal.message.description.invalidEmail"),
      });
      setCountDown(0);
    }
  };

  const onSubmit = async (values: any) => {
    const { codeId, password, confirmPassword } = values;
    console.log(password, confirmPassword);
    if (password !== confirmPassword) {
      api.error({
        message: t("login.modal.message.error"),
        description: t("login.modal.message.description.invalidPassword"),
      });
      return;
    }
    const res = await callChangePassword(
      userEmail ?? "",
      codeId,
      password,
      confirmPassword
    );
    if (res?.data) {
      messageApi.success(t("login.modal.message.description.success"));
      setCurrent(2);
    } else {
      api.error({
        message: t("login.modal.message.error"),
        description: t("login.modal.message.description.invalidCode"),
      });
    }
  };

  return (
    <>
      <Modal
        maskClosable={false}
        title={<p>{t("login.modal.title")}</p>}
        footer={null}
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <Steps
          current={current}
          items={[
            {
              title: t("login.modal.step1.title"),
              //status: "finish",
              icon: <UserOutlined />,
            },
            {
              title: t("login.modal.step2.title"),
              //status: "finish",
              icon: <SolutionOutlined />,
            },
            {
              title: t("login.modal.step3.title"),
              //status: "wait",
              icon: <SmileOutlined />,
            },
          ]}
        />
        {current === 0 && (
          <Form
            onFinish={onFinish}
            layout="vertical"
            style={{ margin: "18px 0" }}
          >
            <Form.Item<FieldType>
              label={t("login.modal.step1.label")}
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label={null}>
              <Button loading={isSending} type="primary" htmlType="submit">
                {t("login.modal.step1.button")}
              </Button>
            </Form.Item>
          </Form>
        )}
        {current === 1 && (
          <Form
            onFinish={onSubmit}
            layout="vertical"
            style={{ margin: "18px 0" }}
          >
            <Form.Item<FieldType>
              label={t("login.modal.step2.code")}
              name="codeId"
              rules={[
                { required: true, message: "Vui lòng nhập mã xác nhận!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label={t("login.modal.step2.newPassword")}
              name="password"
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item<FieldType>
              label={t("login.modal.step2.confirmPassword")}
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập lại xác nhận mật khẩu!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                {t("login.modal.step2.button")}
              </Button>
            </Form.Item>
          </Form>
        )}
        {current === 2 && (
          <div style={{ margin: "18px 0" }}>
            {t("login.modal.step3.description")}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalChangePassword;
