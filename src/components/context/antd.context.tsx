import { notification, message as messageAntd } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { NotificationInstance } from "antd/es/notification/interface";
import React from "react";

interface IAntdContext {
  api: NotificationInstance;
  messageApi: MessageInstance;
}

export const AntdContext = React.createContext<IAntdContext | null>(null);

const LayoutAntd = ({ children }: { children: React.ReactNode }) => {
  const [api, contextHolderNotify] = notification.useNotification();
  const [messageApi, contextHolderMessage] = messageAntd.useMessage();

  return (
    <AntdContext.Provider value={{ api, messageApi }}>
      {contextHolderNotify}
      {contextHolderMessage}
      {children}
    </AntdContext.Provider>
  );
};

export default LayoutAntd;
