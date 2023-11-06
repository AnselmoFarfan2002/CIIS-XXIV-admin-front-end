import { useCallback, useMemo, useState, useEffect } from "react";
import Head from "next/head";
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { TallerInformacion } from "src/sections/taller/inscritos-table";
import { TallerTable } from "src/sections/taller/taller-table";
import URI from "src/contexts/url-context";
import { saveOnChest } from "src/utils/chest";
import { useRouter } from "next/router";
// import { useFormik } from 'formik';

const Page = () => {
    const [loading, setLoading] = useState(true); // Agregamos el estado loading
    const [talleres, setTalleres] = useState([]); 

    useEffect(() => {
        setLoading(true); // Indicamos que se están cargando los datos
    
        // Función asincrónica para obtener los datos de los clientes
        const fetchTaller = async () => {
          try {
            let data = await fetch(`${URI.taller}`, {
              method: "GET",
              credentials: "include",
            });
    
            data = await data.json();
            // data = data.taller;
            console.log(data);
            setTalleres(data);

          } catch (error) {
            console.log(error);
            // Si hay un error, mostramos un mensaje o manejo de errores según tus necesidades
            setLoading(false);
          }
        };
        
        fetchTaller();
      },[]);
    
    const router = useRouter();

    const tallerId = async (taller)=>{
        try{
            let unTaller = await fetch (`${URI.taller}/${taller.id}`, {
                method: "GET",
                credentials: "include",
            });

            unTaller = await unTaller.json();
            saveOnChest("taller",unTaller);
            router.push("/taller/inscritos");
        }
        catch (error) {
            // Si hay un error, mostramos un mensaje o manejo de errores según tus necesidades
            console.log(error);
            setLoading(false);
        };

    };

    return (
    <>
        <Head>
        <title>Taller específico</title>
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
                <Typography variant="h4">Lista de inscritos</Typography>
            </div>
            <div>
                <Grid xs={12} md={6} lg={8}>
                <TallerTable 
                    items = {talleres}
                    tallerId = {tallerId}
                    />
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
