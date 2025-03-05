import { useState, useEffect, useContext } from "react";
import {
  AntDesignOutlined,
  CodeOutlined,
  ContactsOutlined,
  DashOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  RiseOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Avatar, Drawer, Dropdown, MenuProps, Space, message } from "antd";
import { Menu, ConfigProvider } from "antd";
import styles from "@/styles/client.module.scss";
import { isMobile } from "react-device-detect";
import { FaReact } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { callLogout } from "@/config/api";
import { setLogoutAction } from "@/redux/slice/accountSlice";
import Language from "./client.language";
import { useTranslation } from "react-i18next";
import { AntdContext } from "../context/antd.context";

const Header = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { messageApi } = useContext(AntdContext)!;

  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );
  const user = useAppSelector((state) => state.account.user);

  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const [current, setCurrent] = useState("home");
  const location = useLocation();

  const [openMangeAccount, setOpenManageAccount] = useState<boolean>(false);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  const items: MenuProps["items"] = [
    {
      label: <Link to={"/"}>{t("menu.food")}</Link>,
      key: "/",
      icon: <TwitterOutlined />,
    },
    {
      label: <Link to={"/food"}>{t("menu.fresh")}</Link>,
      key: "/food",
      icon: <CodeOutlined />,
    },
    {
      label: <Link to={"/liquor"}>{t("menu.beer")}</Link>,
      key: "/beer",
      icon: <RiseOutlined />,
    },
    {
      label: <Link to={"/mart"}>{t("menu.mart")}</Link>,
      key: "/mart",
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={"/medicine"}>{t("menu.medicine")}</Link>,
      key: "/medicine",
      icon: <AntDesignOutlined />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = async () => {
    const res = await callLogout();
    if (res && res.data) {
      dispatch(setLogoutAction({}));
      messageApi.success(t("menu.logout"));
      navigate("/");
    }
  };

  const itemsDropdown = [
    {
      label: (
        <label
          style={{ cursor: "pointer" }}
          onClick={() => setOpenManageAccount(true)}
        >
          {t("profile.manageAccount")}
        </label>
      ),
      key: "manage-account",
      icon: <ContactsOutlined />,
    },
    {
      label: <Link to={"/admin"}>{t("profile.admin")}</Link>,
      key: "admin",
      icon: <DashOutlined />,
    },
    {
      label: (
        <label style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
          {t("profile.logout")}
        </label>
      ),
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  const itemsMobiles = [...items, ...itemsDropdown];

  return (
    <>
      <div className={styles["header-section"]}>
        <div className={styles["container"]}>
          {!isMobile ? (
            <div style={{ display: "flex", gap: 30 }}>
              <div className={styles["brand"]}>
                <FaReact onClick={() => navigate("/")} title="Hỏi Dân IT" />
              </div>
              <div className={styles["top-menu"]}>
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#fff",
                      colorBgContainer: "#222831",
                      colorText: "#a7a7a7",
                      colorBgBase: "#2231",
                    },
                  }}
                >
                  <Menu
                    // onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    items={items}
                  />
                </ConfigProvider>
                <div className={styles["extra"]}>
                  {isAuthenticated === false ? (
                    <Link to={"/login"}>{t("menu.login")}</Link>
                  ) : (
                    <Dropdown
                      menu={{ items: itemsDropdown }}
                      trigger={["click"]}
                    >
                      <Space style={{ cursor: "pointer" }}>
                        <span>
                          {t("profile.welcome")} {user?.lastName}
                        </span>
                        <Avatar>
                          <span style={{ marginTop: 4 }}>
                            {user?.lastName?.substring(0, 2)?.toUpperCase()}
                          </span>
                        </Avatar>
                      </Space>
                    </Dropdown>
                  )}
                  <Language />
                </div>
              </div>
            </div>
          ) : (
            <div className={styles["header-mobile"]}>
              <span>Your APP</span>
              <MenuFoldOutlined onClick={() => setOpenMobileMenu(true)} />
            </div>
          )}
        </div>
      </div>
      <Drawer
        title="Chức năng"
        placement="right"
        onClose={() => setOpenMobileMenu(false)}
        open={openMobileMenu}
      >
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="vertical"
          items={itemsMobiles}
        />
      </Drawer>
    </>
  );
};

export default Header;
