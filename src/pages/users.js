import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { UsersForm } from "src/sections/users/users-form";
// import { useFormik } from 'formik';

const Page = () => {
// const formik = useFormik({
//     initialValues: {
//       email: '',
//       name: '',
//       password: '',
//       submit: null
//     },
//     onSubmit: async (values, helpers) => {
//       try {
//         await auth.signUp(values.newName, values.newFirstLastname, values.newSecondLastname, values.newEmail, values.newPhone, values.newPassword);
//         router.push('/');
//       } catch (err) {
//         helpers.setStatus({ success: false });
//         helpers.setErrors({ submit: err.message });
//         helpers.setSubmitting(false);
//       }
//     }
//   });

    return (
    <>
        <Head>
        <title>Creación de Cuenta</title>
        </Head>
        <Box
        component="main"
        sx={{
            flexGrow: 1,
            py: 8,
        }}
        >
        <Container maxWidth="lg">
            <Stack spacing={3}>
            <div>
                <Typography variant="h4">Añadir cuenta de organizador</Typography>
            </div>
            <div>
                <Grid xs={12} md={6} lg={8}>
                <UsersForm />
                </Grid>
            </div>
            </Stack>
        </Container>
        </Box>
    </>
    );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
