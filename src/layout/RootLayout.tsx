import { Outlet } from "@tanstack/react-router";
import { ToastContainer } from "react-toastify";

import { Header } from "./Header";
import { AccountBar } from "../features/auth/ui";

import cls from "./RootLayout.module.css";
import "react-toastify/dist/ReactToastify.css";

export const RootLayout = () => (
  <>
    <Header renderAccountBar={() => <AccountBar />} />
    <main className={cls.main}>
      <Outlet />
      <ToastContainer />
    </main>
  </>
);
