import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import * as Yup from "yup";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { useLogin } from "./hooks";

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
  message: {
    marginBottom: "48px !important",
  },
  button: {
    backgroundColor: "#CAD225 !important",
    color: "white !important",
    "&:hover": {
      backgroundColor: "#8C8D8F !important",
    },
  },
  imageBanner: {
    width: "190px",
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
  password: string;
}

const LogIn = () => {
  const { login } = useLogin();

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const { email, password } = values;
    await login({ email, password });
    actions.setSubmitting(false);
  };

  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("El campo es requerido"),
    password: Yup.string().required("El campo es requerido"),
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={require('../../../resources/images/login-banner.png')}
            alt="Logo UTS"
            className={classes.imageBanner}
          />
        </Box>
        <Typography component="h1" variant="h2" style={{ color: "#666666" }}>
          Parking UTS
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form>
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "#C3D730" }}
              >
                {isSubmitting ? "Accediendo..." : "Acceder"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <img
          src="https://www.uts.edu.co/sitio/wp-content/uploads/2019/10/Logo-UTS-1.png"
          alt="Logo UTS"
          className={classes.image}
        />
      </Box>
      <Box mt={4} mb={4} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          {"© "}
          <Link color="inherit" href="https://www.uts.edu.co/sitio/transparencia-y-acceso-a-la-informacion-publica/politicas-de-privacidad-y-condiciones-de-uso/">
            Unidades Tecnologicas de Santander
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Box>
    </Container>
  );
};

export default LogIn;
