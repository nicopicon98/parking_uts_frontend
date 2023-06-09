import { Box, Container, Typography, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../../state/models/routes";

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
  image: {
    width: "225px",
    objectFit: "cover",
    objectPosition: "center center",
    backgroundRepeat: "no-repeat",
    marginBottom: "24px !important",
  },
});

const NotFound = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(`/${PrivateRoutes.PRIVATE_DASHBOARD}`);
  };

  return (
    <Container maxWidth="sm">
      <Box className={classes.root}>
        <img
          src="https://www.uts.edu.co/sitio/wp-content/uploads/2019/10/Logo-UTS-1.png"
          alt="Logo UTS"
          className={classes.image}
        />
        <Typography variant="h4" className={classes.title}>
          Pagina no encontrada
        </Typography>
        <Typography variant="body1" className={classes.message}>
          Revisa muy bien la url o pagina de destino.
        </Typography>
        <Button className={classes.button} onClick={handleLogin}>
          Ir al inicio
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
