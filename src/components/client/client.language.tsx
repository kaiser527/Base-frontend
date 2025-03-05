import { Dropdown, Space } from "antd";
import { MdLanguage } from "react-icons/md";
import styles from "@/styles/client.module.scss";
import { useTranslation } from "react-i18next";
import { LANGUAGES } from "@/config/utils";

const Language = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const languagesDropdown = [
    {
      label: (
        <label
          onClick={() => handleChangeLanguage(LANGUAGES.en)}
          style={{ cursor: "pointer" }}
        >
          {t("language.english")}
        </label>
      ),
      key: "english",
    },
    {
      label: (
        <label
          onClick={() => handleChangeLanguage(LANGUAGES.vi)}
          style={{ cursor: "pointer" }}
        >
          {t("language.vietname")}
        </label>
      ),
      key: "vietnamese",
    },
  ];

  return (
    <Dropdown menu={{ items: languagesDropdown }} trigger={["click"]}>
      <Space style={{ cursor: "pointer" }}>
        <span>
          <MdLanguage className={styles["language-icon"]} />
        </span>
      </Space>
    </Dropdown>
  );
};

export default Language;
