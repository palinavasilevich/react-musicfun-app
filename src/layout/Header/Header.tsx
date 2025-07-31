import { Link } from "@tanstack/react-router";

import cls from "./header.module.css";

import type { ReactNode } from "react";

type Props = {
  renderAccountBar: () => ReactNode;
};

export const Header = ({ renderAccountBar }: Props) => {
  const menuItems = [{ name: "Playlists", path: "/" }];

  return (
    <header className={cls.header}>
      <div className={cls.linksBlock}>
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cls.link}
            activeProps={{ className: cls.activeLink }}
            activeOptions={{ exact: true }}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div>{renderAccountBar()}</div>
    </header>
  );
};
