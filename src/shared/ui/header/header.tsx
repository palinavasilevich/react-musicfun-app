import { Link } from "@tanstack/react-router";

import cls from "./header.module.css";

import type { ReactNode } from "react";

type Props = {
  renderAccountBar: () => ReactNode;
};

export const Header = ({ renderAccountBar }: Props) => {
  return (
    <header className={cls.header}>
      <div className={cls.container}>
        <div className={cls.linksBlock}>
          <Link to="/">Playlists</Link>
          <Link to="/my-playlists">My Playlists</Link>
          <Link to="/oauth/callback">TEMP PAGE</Link>
        </div>

        <div>{renderAccountBar()}</div>
      </div>
    </header>
  );
};
