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
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Input from "@mui/material/Input";

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
      // displayFormData(data); // show form data at console
      fetch(URI.speakers, {
        method: "POST",
        body: data,
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

  const handleUploadClick = () => {
    console.log("Subiendo imagen:");
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
                      <TextField fullWidth label="Nombres y Apellidos" name="name" required />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField fullWidth label="Rol" name="role" required />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField fullWidth label="Lugar de trabajo" name="placeWork" required />
                    </Grid>
                    <Grid xs={12} md={6}>
                      <TextField fullWidth label="Nacionalidad" name="nacionality" required />
                    </Grid>
                    <Grid xs={12} md={12}>
                      <TextField fullWidth label="Red Social" name="socialNetwork" required />
                    </Grid>
                    <Grid xs={12} md={12}>
                      <TextareaAutosize
                        minRows={3}
                        maxRows={10}
                        placeholder="Descripción"
                        name="desc"
                        required
                        style={{ width: "100%" }}
                      />
                    </Grid>
                    {/* <Grid xs={12} md={12}>
                      <input
                        accept="image/jpeg, image/png"
                        className={classes.customInput}
                        id="image-upload-input"
                        type="file"
                        onChange={handleImageChange}
                      />
                      <label htmlFor="image-upload-input">
                        <Button fullWidth variant="text" component="span">
                          Subir imagen
                        </Button>
                      </label>
                    </Grid> */}
                    <Grid xs={12} md={12}>
                      <Button fullWidth variant="text" onClick={handleUploadClick}>
                        Subir Imagen
                      </Button>
                      {/* <Input
                        fullWidth
                        type="file"
                        inputProps={{
                          accept: "image/jpeg, image/png",
                        }}
                        name="avatar"
                        required
                      /> */}
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
