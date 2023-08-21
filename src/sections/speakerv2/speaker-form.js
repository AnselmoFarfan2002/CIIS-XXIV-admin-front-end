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
  
  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} sm={12} md={12}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="Ponente"
              height="300"
              image="/static/images/cards/contemplative-reptile.jpg"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Nombre de ponente
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Descripción de ponente, Descripción de ponente, Descripción de ponente, 
                Descripción de ponente.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Editar</Button>
              <Button size="small">Borrar</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
