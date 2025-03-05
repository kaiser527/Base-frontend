import { Button, Form, Input, Modal, Steps } from "antd";
import {
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { callCheckCode, callResendCode } from "@/config/api";
import { AntdContext } from "../../context/antd.context";
import { useTranslation } from "react-i18next";

type FieldType = {
  codeId: string;
};

const ModalReactive = (props: any) => {
  const { open, setOpen, loading, email } = props;

  const { api, messageApi } = useContext(AntdContext)!;

  const { t } = useTranslation();

  const [userId, setUserId] = useState<number | undefined>(undefined);
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

  const onFinish = async (email: string) => {
    setCountDown(5);
    const res = await callResendCode(0, email);
    if (res?.data && countDown === 0) {
      messageApi.success(t("login.modal.message.description.validEmail"));
      setCurrent(1);
      setUserId(res.data?.userId);
    } else {
      api.error({
        message: t("login.modal.message.error"),
        description: t("login.modal.message.description.invalidEmail"),
      });
      setCountDown(0);
    }
  };

  const onSubmitCode = async (values: any) => {
    const { codeId } = values;
    const response = await callCheckCode(userId ?? 0, codeId);
    if (response?.data) {
      messageApi.success(t("login.modal.message.description.activeSucceed"));
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
        title={<p>{t("login.modal.activeTitle")}</p>}
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
          <>
            <div style={{ margin: "18px 0" }}>
              {t("login.modal.step1.notActive")}
            </div>
            <Button
              loading={isSending}
              type="primary"
              onClick={() => onFinish(email)}
            >
              {t("login.modal.step1.button")}
            </Button>
          </>
        )}
        {current === 1 && (
          <Form
            onFinish={onSubmitCode}
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
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit">
                {t("login.modal.step2.button")}
              </Button>
            </Form.Item>
          </Form>
        )}
        {current === 2 && (
          <div style={{ margin: "18px 0" }}>
            {t("login.modal.step3.activeSucceed")}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalReactive;
