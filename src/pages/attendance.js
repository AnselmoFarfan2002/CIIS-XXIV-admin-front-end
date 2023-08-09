import UserPlusIcon from "@heroicons/react/24/solid/UserPlusIcon";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  Grid,
  InputBase,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import QrReader from "react-qr-scanner";
import { useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import DangerousIcon from "@mui/icons-material/Dangerous";
import URI from "src/contexts/url-context";

const Page = () => {
  const [result, setResult] = useState(null);
  const [scan, setScan] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const handleScan = (result) => {
    if (result) {
      setResult(result);
      fetch(result.text)
        .then((res) => {
          if (res.ok) return setSuccess(true);
          throw new Error();
        })
        .catch(() => setFailure(true));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);

    if (event.target.checkValidity()) {
      let dni = event.target.querySelector("input").value;
      fetch(URI.events + `/12/attendance?user=${dni}`)
        .then((res) => {
          if (res.ok) return setSuccess(true);
          throw new Error();
        })
        .catch(() => setFailure(true));
    }
  };

  const handleCloseSuccess = () => {
    setSuccess(false);
    setResult(null);
  };

  const handleCloseFailure = () => {
    setFailure(false);
    setResult(null);
  };

  return (
    <>
      <Head>Asistencia | CIIS XXIV</Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container>
          <Stack spacing={3}>
            <Box>
              <Typography variant="h4">Asistencia</Typography>
            </Box>
            <Box>
              <Grid container spacing={3}>
                <Grid item md={4} xs={12}>
                  <Card>
                    <CardContent>
                      <Box component={"form"} onSubmit={handleSubmit}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            gap: 1,
                          }}
                        >
                          <Typography variant="h6">Marcar por DNI</Typography>
                        </Box>
                        <Box my={2}>
                          <TextField
                            variant="standard"
                            placeholder="p.e. 77558811"
                            type="number"
                            name="dni"
                            label="Ingrese DNI"
                            fullWidth
                            inputProps={{
                              pattern: "^[0-9]{8}$", // Expresión regular
                              title: "Ingrese un DNI válido",
                            }}
                            required
                          />
                        </Box>
                        <Button
                          type="submit"
                          variant="text"
                          sx={{
                            color: "grey",
                            backgroundColor: "rgba(0,0,0,.02)",
                            borderRadius: 0,
                          }}
                          fullWidth
                        >
                          <HowToRegIcon fontSize="small" />
                          Enviar
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Card>
                    <CardContent>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <Typography variant="h6">Marcar por scan QR</Typography>

                        <Box>
                          <Typography variant="title2">Habilitar escaner QR</Typography>
                          <Switch
                            inputProps={{ "aria-label": "Color switch demo" }}
                            color="secondary"
                            onChange={() => setScan(!scan)}
                          />
                        </Box>
                      </Box>

                      <Box display={"flex"} justifyContent={"center"}>
                        {!result && scan ? (
                          <QrReader
                            width={200}
                            height={200}
                            onError={() => console.log("existe un error al escanear")}
                            onScan={handleScan}
                          />
                        ) : (
                          <Box minHeight={200} minWidth={200} backgroundColor="rgba(0,0,0,.1)" />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Dialog open={success} onClose={handleCloseSuccess}>
        <DialogContent>
          <Container>
            <Typography variant="h6" mb={2} textAlign={"center"}>
              Asistencia marcada con éxito
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
              Ocurrió un error durante la asistencia
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

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
