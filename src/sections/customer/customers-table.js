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

import React, { useState } from "react";
import { RViewerTrigger, RViewer } from "react-viewerjs";

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
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

  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const toShow = [items[0].fileUniversity, items[0].voucher];
  const [images, setImages] = useState(toShow);

  const openViewer = () => {
    setViewerIsOpen(true);
  };

  const closeViewer = () => {
    setViewerIsOpen(false);
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
                <TableCell>Matrícula</TableCell>
                <TableCell>Voucher</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.id);

                return (
                  <TableRow hover key={customer.id} selected={isSelected}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">
                          {customer.name} {customer.firstLastname} {customer.secondLastname}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{typeIns[customer.typeatendee]}</TableCell>
                    <TableCell>
                      <Typography fontWeight={"bold"} color={statusContent[customer.status].style}>
                        {statusContent[customer.status].label}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Avatar
                        src={customer.fileUniversity}
                        sx={{ border: 1, borderColor: "rgba(0,0,0,.5)" }}
                        onClick={openViewer}
                      />
                    </TableCell>
                    <TableCell>
                      <Avatar
                        src={customer.voucher}
                        sx={{ border: 1, borderColor: "rgba(0,0,0,.5)" }}
                      />
                    </TableCell>
                    <TableCell>
                      <ButtonGroup variant="contained" aria-label="Controles de confirmación">
                        <Button color="success" disabled={customer.status == 2} title="Confirmar">
                          <CheckCircleIcon />
                        </Button>
                        <Button color="error" disabled={customer.status == 2} title="Observar">
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
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />

      <Viewer
        visible={viewerIsOpen}
        onClose={closeViewer}
        images={images.map((image) => ({ src: image }))}
        activeIndex={0} // Índice de la imagen activa inicial
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
