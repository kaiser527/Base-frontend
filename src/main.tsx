import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import App from "./App";
import { persistor, store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import LayoutAntd from "./components/context/antd.context";
import "@ant-design/v5-patch-for-react-19";
import "./config/translations/i18n";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <BrowserRouter>
          <LayoutAntd>
            <App />
          </LayoutAntd>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
