import { Button, Col, Divider, Form, Input, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { callCheckCode, callResendCode } from "@/config/api";
import { AntdContext } from "@/components/context/antd.context";
import { useTranslation } from "react-i18next";

const VerifyPage = () => {
  const { api, messageApi } = useContext(AntdContext)!;

  const [countDown, setCountDown] = useState<number>(0);
  const [isSending, setIsSending] = useState<boolean>(false);
  const { t } = useTranslation();

  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

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
    const { codeId, id } = values;
    const response = await callCheckCode(+id, codeId);
    if (response?.data) {
      navigate("/login");
      messageApi.success(t("login.modal.message.description.activeSucceed"));
    } else {
      api.error({
        message: t("message.error"),
        description: t("login.modal.message.description.invalidCode"),
      });
    }
  };

  const handleResendVerifyCode = async () => {
    setCountDown(3);
    const response = await callResendCode(+id, "");
    if (response?.data) {
      messageApi.success(t("login.modal.message.description.validEmail"));
    } else {
      api.error({
        message: t("message.error"),
        description: t("verify.message.resendError"),
      });
      setCountDown(0);
    }
  };

  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend style={{ fontSize: "15px" }}>{t("verify.title")}</legend>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item hidden label="Id" name="id" initialValue={+id}>
              <Input disabled />
            </Form.Item>
            <div>{t("verify.subTitle")}</div>
            <Divider />
            <Form.Item
              label={t("verify.code")}
              name="codeId"
              rules={[
                {
                  required: true,
                  message: "Please input your Code!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {t("verify.submit")}
                </Button>
              </Form.Item>
              <Button
                loading={isSending}
                onClick={handleResendVerifyCode}
                type="default"
              >
                {t("verify.resend")}
              </Button>
            </div>
          </Form>
          <Link to={"/"}>
            <ArrowLeftOutlined /> {t("verify.home")}
          </Link>
        </fieldset>
      </Col>
    </Row>
  );
};

export default VerifyPage;
