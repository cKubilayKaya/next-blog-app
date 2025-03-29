"use client";

import { Provider } from "react-redux";
import "./globals.css";
import ProvideLayout from "./ProvideLayout";
import { store } from "@/store";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <ProvideLayout>{children}</ProvideLayout>
    </Provider>
  );
}
