import { Button } from "../../../../shared/components";
import { LogoutIcon } from "../../../../shared/icons";
import { useLogoutMutation } from "../../api/useLogoutMutation";

export const LogoutButton = () => {
  const { mutate: logout } = useLogoutMutation();

  const handleLogoutClick = () => {
    logout();
  };

  return (
    <Button
      as="button"
      target="_blank"
      variant="primary"
      onClick={handleLogoutClick}
    >
      <LogoutIcon />
      Logout
    </Button>
  );
};
