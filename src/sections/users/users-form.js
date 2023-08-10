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
} from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { useFormik } from 'formik';

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
  {
    value: "los-angeles",
    label: "Los Angeles",
  },
];

export const UsersForm = () => {
  const { user } = useAuth();
  const [values, setValues] = useState(user);

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  

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
        // helpers.setSubmitting(false);
  //     }
  //   }
  // });

  return (
    <form 
      autoComplete="off" 
      noValidate 
      onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Rellenar los campos con la información necesaria" title="Formulario" />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombres"
                  name="name"
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Primer apellido"
                  name="firstLastname"
                  onChange={handleChange}
                  required
                  value={formik.values.newFirstLastname}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Segundo apellido"
                  name="secondLastname"
                  onChange={handleChange}
                  required
                  value={formik.values.newSecondLastname}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  name="email"
                  onChange={handleChange}
                  required
                  value={formik.values.newEmail}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Celular"
                  name="phone"
                  onChange={handleChange}
                  type="text"
                  value={formik.values.newPhone}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Contraseña"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  required
                  value={formik.values.newPassword}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button type="sumbmit" variant="contained">Crear cuenta</Button>
        </CardActions>
      </Card>
    </form>
  );
};
