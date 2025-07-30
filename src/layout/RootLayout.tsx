import { Outlet } from "@tanstack/react-router";

import { Header } from "./Header";
import { AccountBar } from "../features/auth/ui";

import cls from "./RootLayout.module.css";

export const RootLayout = () => (
  <>
    <Header renderAccountBar={() => <AccountBar />} />
    <main className={cls.main}>
      <Outlet />
    </main>
  </>
);
