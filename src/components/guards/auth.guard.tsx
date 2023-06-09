import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { PrivateRoutes, PublicRoutes } from "../../state/models/routes";
import { IAppStore } from "../../state/redux/store";

// Interface for Props
interface Props {
  privateValidation: boolean;
}

// Fragments for private and public validation
const PrivateValidationFragment = <Outlet />;
const PublicValidationFragment = (
  <Navigate replace to={PrivateRoutes.PRIVATE_DASHBOARD} />
);

// AuthGuard component that serves as an authorization guard for routes
export const AuthGuard = ({ privateValidation }: Props) => {
  // useSelector hooks to get the user state from the Redux store
  const userState = useSelector((store: IAppStore) => store.user);

  // If user is logged in (name exists in user state), render the appropriate route fragment based on privateValidation prop
  return userState.email ? (
    privateValidation ? (
      PrivateValidationFragment // Render the private route fragment if privateValidation is true
    ) : (
      PublicValidationFragment // Render the public route fragment if privateValidation is false
    )
  ) : (
    // If user is not logged in (name does not exist in user state), redirect to the login page
    <Navigate replace to={PublicRoutes.LOGIN} />
  );
};

// Export the AuthGuard component as default
export default AuthGuard;
