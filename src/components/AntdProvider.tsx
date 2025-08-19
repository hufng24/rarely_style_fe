"use client";

import React from "react";
import { ConfigProvider, App as AntApp } from "antd";

export function AntdProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider>
      <AntApp>{children}</AntApp>
    </ConfigProvider>
  );
}
