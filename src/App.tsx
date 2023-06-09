import { Suspense, useContext, lazy } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext } from "./state/context";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilitiesConfigurator } from "./components/pages/utilities";
import { RoutesWithNotFound } from "./components/pages/utilities";
import { Route, Navigate } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./state/models/routes";
import { AuthGuard } from "./components/guards";

// Lazily load the Login component
const Login = lazy(() => import("./components/pages/public/login/login.page"));
const Dashboard = lazy(
  () => import("./components/pages/private/dashboard/dashboard.page")
);
const RegisterVehicle = lazy(
  () =>
    import("./components/pages/public/register-vehicle/register-vehicle.page")
);
console.log(process.env.REACT_APP_API_URL!);
const App = () => {
  // Retrieve the color context for theming
  const ctxColor = useContext(ColorModeContext);
  return (
    <ThemeProvider theme={ctxColor!.theme}>
      <SnackbarProvider
        style={{ fontSize: 18 }}
        maxSnack={2}
        autoHideDuration={3000}
      >
        {/* Loader when LAZY LOADING the component */}
        <Suspense fallback={<>Cargando</>}>
          {/* CssBaseline  para asegurar un estandar de linea de estilos base consistente en los buscadores */}
          <CssBaseline />
          <div className="app">
            <RoutesWithNotFound>
              {/* Authenticated */}
              <Route
                path="/"
                element={<Navigate to={PrivateRoutes.PRIVATE_DASHBOARD} />}
              />
              {/* Not authenticated */}
              <Route path={PublicRoutes.LOGIN} element={<Login />} />
              <Route
                path={PublicRoutes.REGISTER_VEHICLE}
                element={<RegisterVehicle />}
              />
              {/* Guardians */}
              <Route element={<AuthGuard privateValidation={true} />}>
                <Route
                  path={`${PrivateRoutes.PRIVATE_DASHBOARD}/*`}
                  element={<Dashboard />}
                />
              </Route>
            </RoutesWithNotFound>
          </div>
        </Suspense>
        <SnackbarUtilitiesConfigurator />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
