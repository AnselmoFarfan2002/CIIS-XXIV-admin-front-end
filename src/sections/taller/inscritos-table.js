import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { capitalize } from "@mui/material";
import capitalizeWords from "src/utils/capitalizeWords";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { useState } from "react";
import { domain } from "src/contexts/url-context";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

export const TablaInscritos = ({ taller }) => {
  const [currentImages, setCurrentImages] = useState({});
  const [openGallery, setOpenGallery] = useState(false);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
    {
      field: "createdAt",
      headerName: "Fecha creada",
      width: 150,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "state",
      headerName: "Estado",
      width: 150,
      renderCell: (params) => {
        let textColor = "black";
        let customContent = "";

        if (params.value === 0) {
          textColor = "black"; // Color de texto para el estado 0
          customContent = "Pendiente";
        } else if (params.value === 1) {
          textColor = "green"; // Color de texto para el estado 1
          customContent = "Confirmado";
        } else if (params.value === 2) {
          textColor = "red"; // Color de texto para el estado 2
          customContent = "Observado";
        }
        return <div style={{ color: textColor }}>{customContent}</div>;
      },
    },
    {
      field: "relatedUser",
      headerName: "Usuario",
      width: 300,
      renderCell: (params) => {
        let User = params.value;
        return capitalizeWords(`${User.name_user} ${User.lastname_user}`);
      },
    },
    {
      field: "voucher",
      headerName: "Ver Voucher",
      width: 150,
      renderCell: (params) => (
        <TableCell>
          <IconButton
            aria-label="Ver voucher"
            size="medium"
            onClick={() => {
              let slides = [];
              slides.push({ src: domain + "/api/v2" + params.value });
              console.log(slides);
              // customer.slides = slides;

              setCurrentImages({ slides, index: 0 });
              setOpenGallery(true);
            }}
            color="light"
            sx={{ border: 0.2, borderColor: "rgba(28, 37, 54, .5)" }}
            variant="contained"
          >
            <RequestQuoteIcon />
          </IconButton>
        </TableCell>
      ),
    },
    // {
    //     field: 'relatedUser',
    //     headerName: 'Correo',
    //     width: 250,
    //     renderCell: (params) =>{
    //       let Correo = params.value;
    //       return capitalizeWords (`${Correo.email_user}`)
    //     }
    // },

    {
      field: "actions",
      headerName: "Acciones",
      width: 160,
      renderCell: (params) => {
        return (
          <div>
            <button onClick={() => handleButton1Click(params.row.id)}>Botón 1</button>
            <button onClick={() => handleButton2Click(params.row.id)}>Botón 2</button>
          </div>
        );
      },
    },
  ];

  const rows = taller.inscriptions;
  console.log(rows);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
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
    </Box>
  );
};
