import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { SpeakerForm } from "src/sections/speakerv2/speaker-form";
// import { useFormik } from 'formik';

const Page = () => {

    return (
    <>
        <Head>
        <title>Ponentes</title>
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
                <Typography variant="h4">Lista de ponentes</Typography>
            </div>
            <div>
                <Grid md={12} lg={12}>
                <SpeakerForm />
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
