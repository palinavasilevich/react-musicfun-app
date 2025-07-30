import { Link } from "@tanstack/react-router";
import { useMeQuery } from "../../api/useMeQuery";

import cls from "./CurrentUser.module.css";
import { LogoutButton } from "../LogoutButton";

export const CurrentUser = () => {
  const { data } = useMeQuery();

  if (!data) {
    return <span>...</span>;
  }

  return (
    <div className={cls.meInfoContainer}>
      <Link to="/my-playlists" activeOptions={{ exact: true }}>
        {data!.login}
      </Link>
      <LogoutButton />
    </div>
  );
};
