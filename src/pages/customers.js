import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import DangerousIcon from "@mui/icons-material/Dangerous";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/customers-table";
import { CustomersSearch } from "src/sections/customer/customers-search";
import { applyPagination } from "src/utils/apply-pagination";

const now = new Date();

const data = [
  {
    id: "1",
    name: "Anselmo",
    firstLastname: "Farfan",
    secondLastname: "Pajuelo",
    email: "examplo1@ciistacna.com",
    typeatendee: 1,
    status: 1,
    fileUniversity: "/assets/avatars/avatar-default.png",
    voucher: "/assets/avatars/avatar-alcides-antonio.png",
    phone: "+51 987654321"
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
    voucher: "/assets/avatars/avatar-default.png",
    phone: "+51 987456123"
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
    phone: "+51 987654123"
  },
  {
    id: "3",
    name: "Alvaro Alejandro",
    firstLastname: "Rivera",
    secondLastname: "Ramirez",
    email: "examplo4@ciistacna.com",
    typeatendee: 1,
    status: 1,
    fileUniversity: "/assets/avatars/avatar-default.png",
    voucher: "/assets/avatars/avatar-default.png",
    phone: "+51 987654123"
  },
];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(() => {
    let confirmados = data.filter(a => a.status == 2)
    let noConfirmados = data.filter(a => a.status != 2)
    noConfirmados.sort((a,b) => a.status - b.status)

    return applyPagination([...noConfirmados, ...confirmados], page, rowsPerPage);
  }, [page, rowsPerPage]);
};

const useCustomerIds = (customers) => {
  return useMemo(() => {
    return customers.map((customer) => customer.id);
  }, [customers]);
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

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
                <Typography variant="h4">Clientes</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="warning"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <HourglassTopIcon />
                      </SvgIcon>
                    }
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
                  >
                    Observados
                  </Button>
                </Stack>
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
