import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLogOut } from "../../../../hooks";
import { createUser } from "../../../../../state/redux/states";
import { PrivateRoutes } from "../../../../../state/models/routes";
import { IUserInfo } from "../../../../../state/models/user";
import { AuthService } from "../../../../../services/auth";
import {
  IAuthLoginReq,
  IAuthLoginResp,
} from "../../../../../state/models/auth";
import { SnackbarUtilities } from "../../../utilities";

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  //if user goes to login, we should consider he wants to go
  //this is a good practice
  const { logOut } = useLogOut();

  useEffect(() => {
    logOut();
  }, [logOut]);

  const login = async (props: IAuthLoginReq): Promise<void> => {
    setIsLoginLoading(true);
    try {
      console.log(props, "props");
      const result: IAuthLoginResp = await AuthService.login(props);
      if (!result.error) {
        handleSuccessfulLogin(result.data!);
      } else {
        handleFailedLogin(result.error);
      }
    } catch (error) {
      console.log(error);
      console.log("catch is being handled by AuthService.login");
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleSuccessfulLogin = (userInfo: IUserInfo): void => {
    storeUserInfo(userInfo);
    navigateToDashboard();
  };

  const handleFailedLogin = (error: string[]): void => {
    SnackbarUtilities.error(error[0], "top", "right");
  };

  const navigateToDashboard = (): void => {
    navigate(`/${PrivateRoutes.PRIVATE_DASHBOARD}`, {
      replace: true,
    });
  };

  const storeUserInfo = (userInfo: IUserInfo): void => {
    dispatch(createUser(userInfo));
  };

  return {
    login,
    isLoginLoading,
  };
};
