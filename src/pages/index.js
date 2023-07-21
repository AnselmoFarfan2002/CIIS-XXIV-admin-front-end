import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import DangerousIcon from "@mui/icons-material/Dangerous";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";

import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

const now = new Date();

// THIS IS A CUSTOMER PAGE

const data = [
  {
    id: "1",
    name: "Anselmo",
    firstLastname: "Farfan",
    secondLastname: "Pajuelo",
    email: "examplo1@ciistacna.com",
    typeatendee: 1,
    status: 1,
    fileUniversity:
      "https://d7lju56vlbdri.cloudfront.net/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/cartografian-el-fondo-somero-de-la-costa-mediterranea-con-imagenes-de-satelite/10910240-2-esl-MX/Cartografian-el-fondo-somero-de-la-costa-mediterranea-con-imagenes-de-satelite.jpg",
    voucher:
      "https://media.istockphoto.com/id/1017175098/es/foto/puesta-de-sol-en-la-savana.jpg?s=1024x1024&w=is&k=20&c=NB8kGYzw_VZ5evITKnY-u-xMyUgRmpCDm9xWsqmgv-0=",
    phone: "+51 987654321",
  },
  {
    id: "2",
    name: "Jean",
    firstLastname: "Escobar",
    secondLastname: "Arcaya",
    email: "examplo2@ciistacna.com",
    typeatendee: 1,
    status: 2,
    fileUniversity: "/assets/avatars/avatar-default.png",
    voucher: "/assets/avatars/avatar-alcides-antonio.png",
    phone: "+51 987456123",
  },
  {
    id: "3",
    name: "Diego",
    firstLastname: "Montero",
    secondLastname: "Manrique",
    email: "examplo3@ciistacna.com",
    typeatendee: 1,
    status: 3,
    fileUniversity: "/assets/avatars/avatar-default.png",
    voucher: "/assets/avatars/avatar-default.png",
    phone: "+51 987654123",
  },
  {
    id: "4",
    name: "Alvaro Alejandro",
    firstLastname: "Rivera",
    secondLastname: "Ramirez",
    email: "examplo4@ciistacna.com",
    typeatendee: 1,
    status: 1,
    fileUniversity: "/assets/avatars/avatar-default.png",
    voucher: "/assets/avatars/avatar-default.png",
    phone: "+51 987654123",
  },
];

const useCustomers = (page, rowsPerPage, showOption) => {
  return useMemo(() => {
    let data2render = [];
    let noConfirmados = data.filter((a) => a.status != 2);
    noConfirmados.sort((a, b) => a.status - b.status);

    if (showOption == 0) {
      let confirmados = data.filter((a) => a.status == 2);
      data2render = [...noConfirmados, ...confirmados];
    } else if (showOption == 1) data2render = noConfirmados.filter((a) => a.status == 1);
    else if (showOption == 2) data2render = data.filter((a) => a.status == 2);
    else if (showOption == 3) data2render = noConfirmados.filter((a) => a.status == 3);

    return applyPagination(data2render, page, rowsPerPage);
  }, [page, rowsPerPage, showOption]);
};

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showOption, setShowOption] = useState(0);
  const customers = useCustomers(page, rowsPerPage, showOption);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handleChangeFilter = (event) => {
    setShowOption(event.target.value);
  };

  return (
    <>
      <Head>
        <title>Clientes | CIIS</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4" mb={2}>Clientes</Typography>
                <FormControl variant="standard"  sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-helper-label">Filtro</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={showOption}
                    label="Age"
                    onChange={handleChangeFilter}
                  >
                    <MenuItem value={0}>Listar todos</MenuItem>
                    <MenuItem value={1}>Listar Pendientes</MenuItem>
                    <MenuItem value={3}>Listar Observados</MenuItem>
                    <MenuItem value={2}>Listar Confirmados</MenuItem>
                  </Select>
                  <FormHelperText>Filtro de listado de presinscripciones</FormHelperText>
                </FormControl>
                {/* <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="warning"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <HourglassTopIcon />
                      </SvgIcon>
                    }
                    onClick={() => setShowOption(1)}
                  >
                    Pendientes
                  </Button>
                  <Button
                    color="error"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <DangerousIcon />
                      </SvgIcon>
                    }
                    onClick={() => setShowOption(3)}
                  >
                    Observados
                  </Button>
                  <Button
                    color="success"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <CheckCircleIcon />
                      </SvgIcon>
                    }
                    onClick={() => setShowOption(2)}
                  >
                    Confirmados
                  </Button>
                </Stack> */}
              </Stack>
            </Stack>
            <CustomersSearch />
            <CustomersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
