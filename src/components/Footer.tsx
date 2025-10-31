import { Box, Container, Grid, Paper, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component={Paper} py={10}>
      <Container maxWidth="md">
        <Grid container>
          <Grid item md={4} xs={12}>
            <Typography variant="h4">Riley.</Typography>
          </Grid>
          <Grid item md={4} xs={12}>
            <Typography>Business email</Typography>
            <Typography>rileydot.mtt@gmail.com</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
