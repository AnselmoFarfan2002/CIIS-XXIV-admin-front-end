import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
  Dialog,
  DialogContent,
  Container,
  Typography,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import DangerousIcon from "@mui/icons-material/Dangerous";
import URI from "src/contexts/url-context";

// import { useFormik } from 'formik';

// const states = [
//   {
//     value: "alabama",
//     label: "Alabama",
//   },
//   {
//     value: "new-york",
//     label: "New York",
//   },
//   {
//     value: "san-francisco",
//     label: "San Francisco",
//   },
//   {
//     value: "los-angeles",
//     label: "Los Angeles",
//   },
// ];


export const UsersForm = () => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  // const formik = useFormik({
  //   initialValues: {
  //     newEmail: '',
  //     newName: '',
  //     newPassword: '',
  //     submit: null
  //   },
  //   onSubmit: async (values, helpers) => {
  //     try {
  //       await auth.createAcc(values.newName, values.newFirstLastname, values.newSecondLastname, values.newEmail, values.newPhone, values.newPassword);
  //       router.push('/');
  //     } catch (err) {
  //       helpers.setStatus({ success: false });
  //       helpers.setErrors({ submit: err.message });
  //       helpers.setSubmitting(false);
  //     }
  //   }
  // });

  const handleCloseSuccess = () => {
    setSuccess(false);
  };

  const handleCloseFailure = () => {
    setFailure(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.checkValidity()) {
      let data = new FormData(event.target);
      // displayFormData(data); // show form data at console
      fetch(URI.users, {
        method: "POST",
        body: data,
      })
        .then( async (res) => {
          if (res.ok) return setSuccess(false);
          let serverResponse = await res.json()
          throw new Error(serverResponse)
        })
        .catch((err) => {
          console.log(err); 
          setFailure(true)});
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} sm={10} md={8}>
          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader
                subheader="Rellenar los campos con la información necesaria"
                title="Formulario"
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ m: -1.5 }}>
                  <Grid container spacing={3}>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Nombres"
                        name="name"
                        required
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Apellidos"
                        name="lastname"
                        required
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="DNI"
                        name="dni"
                        required
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Correo electrónico"
                        name="email"
                        required
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Celular"
                        name="phone"
                        type="text"
                        required
                      />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Contraseña"
                        name="password"
                        type="password"
                        required
                      />
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button type="submit" variant="contained">
                  Crear cuenta
                </Button>
              </CardActions>
            </Card>
          </form>
        </Grid>
      </Grid>
      <Dialog open={success} onClose={handleCloseSuccess}>
        <DialogContent>
          <Container>
            <Typography variant="h6" mb={2} textAlign={"center"}>
              Cuenta añadida con éxito
            </Typography>
            <Typography align="center">
              <VerifiedIcon sx={{ fontSize: 100 }} color="success" />
            </Typography>
          </Container>
        </DialogContent>
      </Dialog>
      <Dialog open={failure} onClose={handleCloseFailure}>
        <DialogContent>
          <Container>
            <Typography variant="h6" mb={2} textAlign={"center"}>
              Ocurrió un error durante la creación
            </Typography>
            <Typography align="center">
              <DangerousIcon sx={{ fontSize: 100 }} color="error" />
            </Typography>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
};
