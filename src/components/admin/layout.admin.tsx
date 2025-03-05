import { AdminContextProvider } from "@/components/context/admin.context";
import AdminContent from "@/components/admin/admin.content";
import AdminFooter from "@/components/admin/admin.footer";
import AdminHeader from "@/components/admin/admin.layout";
import AdminSideBar from "@/components/admin/admin.sidebar";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Outlet } from "react-router-dom";
import TableSearch from "../context/table.search.context";

const LayoutAdmin = () => {
  return (
    <AdminContextProvider>
      <div style={{ display: "flex", overflow: "hidden" }}>
        <div className="left-side" style={{ minWidth: 80 }}>
          <PerfectScrollbar>
            <AdminSideBar />
          </PerfectScrollbar>
        </div>
        <div className="right-side" style={{ flex: 1 }}>
          <AdminHeader />
          <PerfectScrollbar style={{ height: "83.4vh" }}>
            <AdminContent>
              <TableSearch>
                <Outlet />
              </TableSearch>
            </AdminContent>
          </PerfectScrollbar>
          <AdminFooter />
        </div>
      </div>
    </AdminContextProvider>
  );
};

export default LayoutAdmin;
