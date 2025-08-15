import { Link } from "@tanstack/react-router";
import { useMeQuery } from "../../api/useMeQuery";
import { LogoutButton } from "../LogoutButton";
import defaultAvatarImg from "../../../../assets/img/default-avatar.png";

import cls from "./CurrentUser.module.css";

export const CurrentUser = () => {
  const { data } = useMeQuery();

  if (!data) {
    return <span>...</span>;
  }

  console.log(data);

  return (
    <div className={cls.meInfoContainer}>
      <Link
        to="/my-playlists"
        className={cls.link}
        activeOptions={{ exact: true }}
      >
        <div className={cls.avatarContainer}>
          <img src={defaultAvatarImg} alt="avatar" />
        </div>
      </Link>
      <LogoutButton />
    </div>
  );
};
