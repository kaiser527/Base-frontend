import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/auth/login";
import Dashboard from "./pages/admin/dashboard";
import ManageUserPage from "./pages/admin/ManageUser";
import ManageRestaurantPage from "./pages/admin/ManageRestaurant";
import RegisterPage from "./pages/auth/register";
import LayoutApp from "./components/share/layout.app";
import { useAppDispatch } from "./redux/hook";
import { useEffect, useRef, useState } from "react";
import { fetchAccount } from "./redux/slice/AccountSlice";
import NotFound from "./components/share/layout.notfoud";
import styles from "styles/app.module.scss";
import ProtectedRoute from "./components/share/protected-route";
import VerifyPage from "./pages/auth/verify";
import LayoutAdmin from "./components/admin/layout.admin";
import Header from "./components/client/client.header";
import CheckAuth from "./components/share/check-auth";

const LayoutClient = () => {
  const location = useLocation();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rootRef && rootRef.current) {
      rootRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="layout-app" ref={rootRef}>
      <Header />
      <div className={styles["content-app"]}>
        <Outlet />
      </div>
    </div>
  );
};

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/verify/:id"
    )
      return;
    dispatch(fetchAccount());
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LayoutApp>
            <LayoutClient />
          </LayoutApp>
        }
      >
        <Route index element={<HomePage />} />
      </Route>
      <Route
        path="/login"
        element={
          <CheckAuth>
            <LoginPage />
          </CheckAuth>
        }
      />
      <Route
        path="/register"
        element={
          <CheckAuth>
            <RegisterPage />
          </CheckAuth>
        }
      />
      <Route
        path="/verify/:id"
        element={
          <CheckAuth>
            <VerifyPage />
          </CheckAuth>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <LayoutAdmin />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/admin/user" element={<ManageUserPage />} />
        <Route path="/admin/restaurant" element={<ManageRestaurantPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
