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
  OpenInNew,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import DangerousIcon from "@mui/icons-material/Dangerous";
import URI from "src/contexts/url-context";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
import { FormData2Json } from "src/utils/form-data-json";

export const SpeakerForm = () => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

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
      data.append("avatar", selectedFile);
      console.log(FormData2Json(data));
      // displayFormData(data); // show form data at console
      fetch(URI.speakers, {
        method: "POST",
        body: data,
        credentials: "include",
      })
        .then(async (res) => {
          if (res.ok) return setSuccess(false);
          let serverResponse = await res.json();
          throw new Error(serverResponse);
        })
        .catch((err) => {
          console.log(err);
          setFailure(true);
        });
    }
  };

  const VisuallyHiddenInput = styled("input")`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
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
                      <TextField fullWidth label="Nombres " name="name" required />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField fullWidth label="Apellidos" name="lastname" required />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField fullWidth label="Rol" name="role" required />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField fullWidth label="Lugar de trabajo" name="workplace" required />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField fullWidth label="Nacionalidad" name="nationality" required />
                    </Grid>
                    <Grid xs={12} md={12}>
                      <TextField fullWidth label="Red Social" name="socialNetwork" required />
                    </Grid>
                    <Grid xs={12} md={12}>
                      <TextField label="Descripción" name="description" fullWidth multiline required />
                    </Grid>
                    <Grid xs={12} md={12}>
                      <Button
                        required
                        // name="avatar"
                        component="label"
                        role={undefined}
                        tabIndex={-1}
                        variant="outlined"
                      >
                        Añadir Foto
                        <VisuallyHiddenInput
                          // name="avatar"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
              <Divider />
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Button type="submit" variant="contained">
                  Añadir ponente
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
              Ponente añadido con éxito
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
