import { useCallback, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Unstable_Grid2 as Grid,
  Typography,
} from "@mui/material";

export const SpeakerForm = () => {
  const speakerData = [
    {
      id: 1,
      name: "Ponenete 1",
      description: "Descripción del ponente 01 ...",
      image: "/",
    },
    {
      id: 2,
      name: "Ponenete 2",
      description: "Descripción del ponente 02 ...",
      image: "/",
    },
  ];

  return (
    <>
      <Grid container spacing={3}>
        {speakerData.map((speaker) => (
          <Grid xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="{speaker.name}"
                height="300"
                image="{speaker.image}"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {speaker.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {speaker.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Editar</Button>
                <Button size="small">Borrar</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
