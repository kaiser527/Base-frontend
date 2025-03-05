import { Footer } from "antd/es/layout/layout";

const AdminFooter = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      Kaiser ©{new Date().getFullYear()} Created by @Kaiser
    </Footer>
  );
};

export default AdminFooter;
