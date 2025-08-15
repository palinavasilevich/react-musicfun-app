import { Link } from "@tanstack/react-router";
import logoImg from "../../assets/img/logo.png";

import cls from "./header.module.css";

import type { ReactNode } from "react";

type Props = {
  renderAccountBar: () => ReactNode;
};

export const Header = ({ renderAccountBar }: Props) => {
  return (
    <header className={cls.header}>
      <div className={cls.logo}>
        <img src={logoImg} alt="logo" className={cls.logoImg} />
        MusicFun
      </div>
      <div className={cls.menu}>
        <Link
          to="/"
          className={cls.link}
          activeProps={{ className: cls.activeLink }}
          activeOptions={{ exact: true }}
        >
          Playlists
        </Link>
        <div>{renderAccountBar()}</div>
      </div>
    </header>
  );
};
