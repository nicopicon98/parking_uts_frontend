import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { clearLocalStorage } from "../pages/utilities";
import { UserKey, resetUser } from "../../state/redux/states";
import { PublicRoutes } from "../../state/models/routes";

interface IResponse {
  logOut: () => void;
}

export const useLogOut = (): IResponse => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    clearLocalStorage(UserKey);
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
  }, [dispatch, navigate]); // Add dependencies here

  return {
    logOut,
  };
};
