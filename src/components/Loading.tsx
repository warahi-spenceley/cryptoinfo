import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Typography } from '@mui/material';

export default function Loading(options: {
  message?: string;
}) {
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12}>
          <CircularProgress size={100} />
        </Grid>
        <Grid item xs={12}>
          <Typography component="h1" variant="h5" align='center'>{options.message || ""}</Typography>
        </Grid>
      </Grid>
    </div>
  );
}