import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Head from "next/head";
import {
  Box,
  Card,
  CardContent,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import URI from "src/contexts/url-context";
import { GridLoader } from "react-spinners";

const Page = () => {
  const [sponsors, setSponsors] = useState([]);
  const [events, setEvents] = useState([]);
  const [showOption, setShowOption] = useState(12);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let response = await fetch(URI.events, {
          method: "GET",
          credentials: "include",
        });
        let data = await response.json();
        setEvents(data);
      } catch (error) {
        throw error;
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchSponsors = async (showOption) => {
      setErrorMsg(null);
      try {
        let response = await fetch(URI.events + `/${showOption}/sponsors`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          setSponsors(null);
          let { error } = await response.json();
          throw new Error(error);
        }
        let data = await response.json();
        setSponsors(data);
      } catch (error) {
        setErrorMsg(error.message);
      }
    };
    fetchSponsors(showOption);
  }, [showOption]);

  const handleChangeFilter = useCallback((event) => {
    setShowOption(event.target.value);
  }, []);

  return (
    <>
      <Head>
        <title>Sponsors | CIIS</title>
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
                <Typography variant="h4" mb={2}>
                  Sponsors
                </Typography>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-simple-select-helper-label">Filtro</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={showOption}
                    label="Event"
                    onChange={handleChangeFilter}
                  >
                    {events.map((event, index) => (
                      <MenuItem key={index} value={event.id_event}>
                        {event.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>Filtro de listado de eventos</FormHelperText>
                </FormControl>
              </Stack>
            </Stack>

            <Grid container spacing={3}>
              {!sponsors
                ? errorMsg
                : sponsors.map((sponsor, index) => (
                    <Grid xs={12} md={6} lg={4} key={index}>
                      <Card>
                        <CardContent>
                          <Image width={300} height={300} src={sponsor.img} />
                          <p>{sponsor.name}</p>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
