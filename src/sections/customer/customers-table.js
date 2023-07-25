import PropTypes from "prop-types";
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Avatar,
} from "@mui/material";
import { ButtonGroup, Button } from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

import React from "react";
import Lightbox from "yet-another-react-lightbox";

import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { useState } from "react";
import { domain } from "src/contexts/url-context";
import URI from "src/contexts/url-context";

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    handleSetCounter = () => {},
    counter = 0,
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const typeIns = ["", "Legado de la ESIS", "Estudiante externo", "Publico general"];
  const statusContent = [
    {},
    { style: "rgb(219, 129, 10)", label: "Pendiente" },
    { style: "rgb(0,200,0)", label: "Confirmado" },
    { style: "rgb(200,20,0)", label: "Observado" },
  ];

  const [currentImages, setCurrentImages] = useState({});
  const [openGallery, setOpenGallery] = useState(false);

  const handleChangeStatus = ({ id }, status, idx) => {
    let buttonCheck = document.getElementById("btn-check-user-" + id);
    let buttonAlert = document.getElementById("btn-alert-user-" + id);
    buttonCheck.disabled = true;
    buttonAlert.disabled = true;
    buttonCheck.classList.add("Mui-disabled");
    buttonAlert.classList.add("Mui-disabled");

    fetch(URI.registrations + `/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          handleSetCounter();
        } else {
          buttonCheck.disabled = false;
          buttonAlert.disabled = false;
          buttonCheck.classList.remove("Mui-disabled");
          buttonAlert.classList.remove("Mui-disabled");
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Celular</TableCell>
                <TableCell>Tipo de inscripción</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Voucher</TableCell>
                <TableCell>Matrícula</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer, idx) => {
                let slides = [];
                slides.push({ src: domain + `/api/v1/registrations/${customer.id}/files/voucher` });
                if (customer.typeattendee != 3)
                  slides.push({
                    src: domain + `/api/v1/registrations/${customer.id}/files/university`,
                  });

                return (
                  <TableRow hover key={customer.id}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          {customer.name} {customer.firstLastname} {customer.secondLastname}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{typeIns[customer.typeattendee]}</TableCell>
                    <TableCell>
                      <Typography
                        fontWeight={"bold"}
                        color={statusContent[customer.enrollmentstatus].style}
                      >
                        {statusContent[customer.enrollmentstatus].label}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Avatar
                        src={slides[0].src}
                        sx={{ border: 1, borderColor: "rgba(0,0,0,.5)", cursor: "pointer" }}
                        onClick={() => {
                          setCurrentImages({ slides, index: 0 });
                          setOpenGallery(true);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {customer.typeattendee != 3 && (
                        <Avatar
                          src={slides[1].src}
                          sx={{ border: 1, borderColor: "rgba(0,0,0,.5)", cursor: "pointer" }}
                          onClick={() => {
                            setCurrentImages({ slides, index: 1 });
                            setOpenGallery(true);
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <ButtonGroup variant="contained" aria-label="Controles de confirmación">
                        <Button
                          id={"btn-check-user-" + customer.id}
                          color="success"
                          disabled={customer.enrollmentstatus == 2}
                          title="Confirmar"
                          onClick={() => handleChangeStatus(customer, "2", idx)}
                        >
                          <CheckCircleIcon />
                        </Button>
                        <Button
                          id={"btn-alert-user-" + customer.id}
                          color="error"
                          disabled={customer.enrollmentstatus == 2}
                          title="Observar"
                          onClick={() => handleChangeStatus(customer, "3", idx)}
                        >
                          <ErrorIcon />
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        labelRowsPerPage="Filas por página"
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      <Lightbox
        index={currentImages.index}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, .7)" } }}
        open={openGallery}
        close={() => setOpenGallery(false)}
        slides={currentImages.slides}
        plugins={[Zoom, Thumbnails]}
        animation={0.02}
        zoom={{
          maxZoomPixelRatio: 5, // Aumenta o disminuye según quieras permitir más o menos zoom
          zoomInMultiplier: 1.2, // Aumenta o disminuye para ajustar la velocidad del zoom con la rueda del mouse o gestos de pinza
          doubleTapDelay: 300, // Aumenta este valor para requerir un doble toque más largo para activar el zoom
          doubleClickDelay: 300, // Aumenta este valor para requerir un doble clic más largo para activar el zoom
          doubleClickMaxStops: 2, // Puedes dejarlo en 2 para un doble clic con un aumento máximo de 2 veces el tamaño original
          keyboardMoveDistance: 100, // Aumenta o disminuye según quieras cambiar la velocidad de desplazamiento con las teclas de flecha
          wheelZoomDistanceFactor: 1000, // Disminuye este valor para tener un zoom más lento con la rueda del mouse
          pinchZoomDistanceFactor: 1000, // Disminuye este valor para tener un zoom más lento con gestos de pinza en dispositivos táctiles
          scrollToZoom: 1, // Activa el zoom al desplazarse con la rueda del mouse
        }}
        carousel={{ preload: 1 }}
        thumbnails={{
          position: "bottom",
          width: 120,
          height: 80,
          border: 1,
          borderRadius: 4,
          padding: 4,
          gap: 16,
          showToggle: 0,
        }}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  handleSetCounter: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  counter: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
