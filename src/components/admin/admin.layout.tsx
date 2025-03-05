import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";
import { useContext } from "react";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { AdminContext } from "../context/admin.context";
import { Link, useNavigate } from "react-router-dom";
import { callLogout } from "@/config/api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setLogoutAction } from "@/redux/slice/AccountSlice";
import { AntdContext } from "../context/antd.context";
import { useTranslation } from "react-i18next";

const AdminHeader = () => {
  const { Header } = Layout;

  const { collapseMenu, setCollapseMenu } = useContext(AdminContext)!;
  const { messageApi } = useContext(AntdContext)!;

  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const account = useAppSelector((state) => state.account.user);

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(setLogoutAction({}));
      messageApi.success(t("menu.logout"));
      navigate("/");
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span>{t("admin.header.setting")}</span>,
    },

    {
      key: "4",
      danger: true,
      label: (
        <Link onClick={() => handleLogout()} to={"/"}>
          {t("admin.header.logout")}
        </Link>
      ),
    },
  ];

  return (
    <>
      <Header
        style={{
          padding: 0,
          display: "flex",
          background: "#f5f5f5",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          type="text"
          icon={collapseMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapseMenu(!collapseMenu)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <Dropdown menu={{ items }}>
          <a
            onClick={(e) => e.preventDefault()}
            style={{
              color: "unset",
              lineHeight: "0 !important",
              marginRight: 20,
            }}
          >
            <Space>
              {t("admin.header.profile")}
              {account.lastName}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Header>
    </>
  );
};

export default AdminHeader;
