import { Box, Container, Grid, Paper } from "@mui/material";
import Balance from "components/Balance";
import Chart from "components/Chart";
import MarginRatio from "components/MarginRatio";
import PNL from "components/PNL";
import Positions from "components/Positions";
import PositionStatistic from "components/PositionStatistic";
import Settings from "components/Settings";
import LayoutMode from "providers/LayoutMode";

export default function TradingPage() {
  return (
    <LayoutMode>
      <Container maxWidth={false}>
        <Box minHeight={"100vh"}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <MarginRatio />
            </Grid>
            <Grid item xs={12} md={3}>
              <Balance />
            </Grid>
            <Grid item xs={12} md={3}>
              <PNL />
            </Grid>
            <Grid item xs={12} md={3}>
              <PositionStatistic />
            </Grid>
            <Grid item xs={12} md={8}>
              <Paper sx={{ height: "100%", mb: 1 }}>
                <Chart />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Positions />
              <Box mb={1} />
              <Settings />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </LayoutMode>
  );
}
