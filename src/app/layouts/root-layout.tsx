import { Outlet } from "@tanstack/react-router";
import { Header } from "../../shared/ui/header/header";

import cls from "./root-layout.module.css";

export const RootLayout = () => (
  <>
    <Header renderAccountBar={() => <div>Account</div>} />
    <div className={cls.container}>
      <Outlet />
    </div>
  </>
);
