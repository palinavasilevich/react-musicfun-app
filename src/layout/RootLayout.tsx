import { Outlet } from "@tanstack/react-router";

import { Header } from "./Header";
import { LoginButton } from "../features/auth/ui/LoginButton";

import cls from "./RootLayout.module.css";

export const RootLayout = () => (
  <>
    <Header renderAccountBar={() => <LoginButton />} />
    <main className={cls.main}>
      <Outlet />
    </main>
  </>
);
