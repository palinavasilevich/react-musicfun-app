import { useMeQuery } from "../../api/useMeQuery";
import { CurrentUser } from "../CurrentUser";
import { LoginButton } from "../LoginButton";
import { SmallLoader } from "../../../../shared/components";

import cls from "./AccountBar.module.css";

export const AccountBar = () => {
  const { data, isPending } = useMeQuery();

  if (isPending) {
    return <SmallLoader />;
  }

  return (
    <div className={cls.accountBar}>
      {!data && <LoginButton />}
      {data && <CurrentUser />}
    </div>
  );
};
