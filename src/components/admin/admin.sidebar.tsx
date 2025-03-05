import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
  AppstoreOutlined,
  SettingOutlined,
  TeamOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import { AdminContext } from "../context/admin.context";
import Language from "../client/client.language";
import { useTranslation } from "react-i18next";

type MenuItem = Required<MenuProps>["items"][number];
const AdminSideBar = () => {
  const { Sider } = Layout;

  const { t } = useTranslation();
  const { collapseMenu } = useContext(AdminContext)!;

  const items: MenuItem[] = [
    {
      key: "grp",
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {t("admin.sidebar.title")}
          <span style={{ fontSize: 18 }}>
            <Language />
          </span>
        </div>
      ),
      type: "group",
      children: [
        {
          key: "dashboard",
          label: (
            <Link to={"/admin"}>{t("admin.sidebar.dashboard.title")}</Link>
          ),
          icon: <AppstoreOutlined />,
        },
        {
          key: "users",
          label: (
            <Link to={"/admin/user"}>{t("admin.sidebar.user.title")}</Link>
          ),
          icon: <TeamOutlined />,
        },
        {
          key: "restaurants",
          label: (
            <Link to={"/admin/restaurant"}>
              {t("admin.sidebar.restaurant.title")}
            </Link>
          ),
          icon: <SettingOutlined />,
        },
        {
          type: "divider",
        },
        {
          key: "home",
          label: <Link to="/">{t("admin.sidebar.home")}</Link>,
          icon: <HomeOutlined />,
        },
      ],
    },
  ];

  return (
    <Sider collapsed={collapseMenu}>
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        items={items}
        style={{ height: "100vh" }}
      />
    </Sider>
  );
};

export default AdminSideBar;
