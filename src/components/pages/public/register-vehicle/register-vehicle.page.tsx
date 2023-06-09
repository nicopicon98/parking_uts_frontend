import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import * as Yup from "yup";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { useGetVehiclesByEmail, useRegisterVehicle } from "./hooks";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import { Chip } from "@mui/material";
import Link from "@mui/material/Link";
import { SnackbarUtilities } from "../../utilities";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "24px !important",
    fontSize: "36px !important",
  },
  button: {
    color: "white !important",
    "&:hover": {
      backgroundColor: "#8C8D8F !important",
    },
  },
  imageBanner: {
    width: "220px",
    objectFit: "cover",
    objectPosition: "center center",
    backgroundRepeat: "no-repeat",
  },
  image: {
    width: "170px",
    objectFit: "cover",
    objectPosition: "center center",
    backgroundRepeat: "no-repeat",
  },
});

interface FormValues {
  email: string;
}
interface FormValues2 {
  vehiclePlate: string;
}

const RegisterVehicle = () => {
  const [isInsertComponentVisible, setIsInsertComponentVisible] =
    useState(false);
  const {
    getUserVehiclesByEmail,
    isFetchingVehiclesLoading,
    userVehicles,
    setUserVehicles,
  } = useGetVehiclesByEmail();
  const { insertVehicleHandler, isInsertingVehicle } =
    useRegisterVehicle(setUserVehicles);

  const [userEmailValue, setUserEmailValue] = useState("");

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const { email } = values;
    await getUserVehiclesByEmail(email);
    setIsInsertComponentVisible(true);
    setUserEmailValue(email);
    actions.setSubmitting(false);
  };

  const handleSubmit2 = async (
    values: FormValues2,
    actions: FormikHelpers<FormValues2>
  ) => {
    const { vehiclePlate } = values;
    console.log(vehiclePlate, "vehiclePlate");
    const isDuplicated = userVehicles.some(
      (vehicle) =>
        vehicle.vehiclePlate.toLowerCase() === vehiclePlate.toLowerCase()
    );
    if (isDuplicated) {
      SnackbarUtilities.warning(
        "Ese vehiculo ya se encuentra registrado",
        "bottom",
        "right"
      );
      actions.setSubmitting(false);
      return;
    }
    //everything is working fine, now, the request
    const obj = {
      userEmail: userEmailValue,
      vehiclePlate : vehiclePlate.toUpperCase(),
    };
    await insertVehicleHandler(obj);
    actions.setSubmitting(false);
  };

  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("El campo es requerido"),
  });

  //required
  //6 characters max
  //alphanumeric characters
  //first 3 letters
  //following 2 numbers
  const validationSchema2 = Yup.object().shape({
    vehiclePlate: Yup.string()
      .required("El campo es requerido")
      .matches(/^[A-Za-z]{3}[0-9]{2}[A-Za-z0-9]$/, "Por favor, ingresa una matrícula válida.")
      .max(6, "La placa dese tener como maximo 6 caracteres")
  });

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <Box marginBottom={2}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src={require("../../../resources/images/please-register.png")}
                alt="Logo UTS"
                className={classes.imageBanner}
              />
            </Box>
            <Typography
              component="h1"
              variant="h3"
              style={{ color: "#666666", marginBottom: 16 }}
            >
              Registro de vehículos ParkingUTS
            </Typography>
            <Typography
              component="h4"
              variant="h6"
              style={{ color: "#666666" }}
            >
              A continuacion, ingresa tu correo institucional
            </Typography>
            <Formik
              initialValues={{ email: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form style={{ marginTop: 0 }}>
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Correo"
                    name="email"
                    autoComplete="off"
                    autoFocus
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    style={{ marginTop: 0 }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={{ mt: 2, mb: 2 }}
                    style={{ backgroundColor: "#C3D730" }}
                  >
                    {isSubmitting ? (
                      <SubmitQueryVehiclesButtonText msg="Consultando..." />
                    ) : !isInsertComponentVisible ? (
                      <SubmitQueryVehiclesButtonText msg="Consultar" />
                    ) : (
                      <SubmitQueryVehiclesButtonText msg="Hacer otra consulta" />
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          </Box>
          {isInsertComponentVisible && (
            <>
              {!isFetchingVehiclesLoading ? (
                <>
                  {userVehicles.length ? (
                    <Box display="flex" flexDirection="column">
                      <Typography
                        component="p"
                        variant="body1"
                        marginBottom={2}
                      >
                        En el momento cuentas con los siguientes vehículos:
                      </Typography>
                      <Box display="flex" flexDirection="row" gap={2}>
                        {userVehicles.map((e) => (
                          <Box key={e.id} marginBottom="8px">
                            <Chip label={e.vehiclePlate} />
                          </Box>
                        ))}
                      </Box>
                      <Typography
                        component="p"
                        variant="body1"
                        marginY={2}
                        fontWeight="bold"
                      >
                        Para agregar mas vehiculos ingresa la matricula del
                        nuevo vehiculo a continuacion:
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <Typography component="p" variant="body1">
                        No tienes vehículos, empieza insertando uno a
                        continuación:
                      </Typography>
                    </>
                  )}
                  <Formik
                    initialValues={{ vehiclePlate: "" }}
                    validationSchema={validationSchema2}
                    onSubmit={handleSubmit2}
                  >
                    {({ isSubmitting, touched, errors }) => (
                      <Form>
                        <Field
                          as={TextField}
                          margin="normal"
                          required
                          fullWidth
                          id="vehiclePlate"
                          label="Placa del vehiculo"
                          name="vehiclePlate"
                          autoComplete="off"
                          autoFocus
                          error={
                            touched.vehiclePlate && Boolean(errors.vehiclePlate)
                          }
                          helperText={
                            touched.vehiclePlate && errors.vehiclePlate
                          }
                          style={{ marginTop: 0 }}
                          inputProps={{ autoCapitalize: "characters" }}
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          disabled={isSubmitting}
                          sx={{ mt: 2, mb: 2 }}
                          style={{ backgroundColor: "#0b4a75" }}
                        >
                          {isSubmitting ? (
                            "Agregando..."
                          ) : (
                            <SubmitNewVehicleButtonText />
                          )}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </>
              ) : (
                <>Cargando...</>
              )}
              <Box mt={8}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src="https://www.uts.edu.co/sitio/wp-content/uploads/2019/10/Logo-UTS-1.png"
                    alt="Logo UTS"
                    className={classes.image}
                  />
                </Box>
                <Box mt={2} mb={4} textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    {"© "}
                    <Link color="inherit" href="https://mui.com/">
                      Your Website
                    </Link>{" "}
                    {new Date().getFullYear()}
                    {"."}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

const SubmitNewVehicleButtonText = () => {
  return (
    <Box display="flex" gap={1} alignItems="center">
      <Typography component="p">Agregar vehiculo</Typography>
      <TwoWheelerIcon fontSize="medium" />
    </Box>
  );
};

interface IPropsSubmitQueryVehiclesButtonText {
  msg: string;
}

const SubmitQueryVehiclesButtonText = ({
  msg,
}: IPropsSubmitQueryVehiclesButtonText) => {
  return (
    <Box display="flex" gap={1} alignItems="center">
      <Typography component="p">{msg}</Typography>
      <PersonIcon fontSize="medium" />
    </Box>
  );
};

export default RegisterVehicle;
