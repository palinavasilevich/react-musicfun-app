import { Outlet } from "@tanstack/react-router";

import { Header } from "./Header";

import cls from "./RootLayout.module.css";

export const RootLayout = () => (
  <>
    <Header renderAccountBar={() => <div>Account</div>} />
    <main className={cls.main}>
      <Outlet />
    </main>
  </>
);
