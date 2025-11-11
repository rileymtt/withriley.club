import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Balance from "components/Balance";
import Chart from "components/Chart";
import MarginRatio from "components/MarginRatio";
import PNL from "components/PNL";
import Positions from "components/Positions";
import PositionStatistic from "components/PositionStatistic";
import Settings from "components/Settings";
import LayoutMode from "providers/LayoutMode";
import { MainProvider } from "providers/MainProvider";
import { Link } from "react-router-dom";

export default function TradingPage() {
  const { lastUpdated } = MainProvider.useState();
  return (
    <LayoutMode notUseHeader notUseFooter>
      <Container maxWidth={false}>
        <Box minHeight={"100vh"} my={2}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                justifyContent={"space-between"}
              >
                <Link to="/" style={{ textDecoration: "none" }}>
                  <IconButton>
                    <ArrowBack />
                  </IconButton>
                </Link>
                <Typography variant="caption">
                  Last updated: {lastUpdated.format("HH:mm:ss YYYY-MM-DD")}
                </Typography>
              </Stack>
            </Grid>
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
            <Grid item xs={12}>
              <Settings />
            </Grid>
            <Grid item xs={12} md={7.5}>
              <Paper sx={{ height: "100%", mb: 1 }}>
                <Chart />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4.5}>
              <Positions />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </LayoutMode>
  );
}
