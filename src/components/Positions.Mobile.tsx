import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import moment from "moment";
import { MainProvider } from "providers/MainProvider";
import { PositionDisplay } from "./Positions";

export default function PositionsMobile() {
  const { positions, orders, selectedPosition } = MainProvider.useState();

  return (
    <Box
      sx={{
        display: {
          md: "none",
          xs: "block",
        },
      }}
    >
      {positions.map((row) => {
        const pnl = parseFloat(row.unRealizedProfit);
        const roi = (pnl / parseFloat(row.initialMargin)) * 100;
        const slOrder = orders.find(
          (o) =>
            o.symbol === row.symbol &&
            o.positionSide === row.positionSide &&
            o.type === "STOP_MARKET"
        );
        const tpOrder = orders.find(
          (o) =>
            o.symbol === row.symbol &&
            o.positionSide === row.positionSide &&
            o.type === "TAKE_PROFIT_MARKET"
        );
        const slPercent = slOrder
          ? (Math.abs(
              parseFloat(row.entryPrice) - parseFloat(slOrder.stopPrice)
            ) /
              Math.abs(
                parseFloat(row.markPrice) - parseFloat(row.entryPrice)
              )) *
            100
          : 0;
        const tpPercent = tpOrder
          ? (Math.abs(
              parseFloat(tpOrder.stopPrice) - parseFloat(row.entryPrice)
            ) /
              Math.abs(
                parseFloat(row.markPrice) - parseFloat(row.entryPrice)
              )) *
            100
          : 0;
        const slUSDT = slOrder
          ? (
              (Math.abs(
                parseFloat(row.entryPrice) - parseFloat(slOrder.stopPrice)
              ) /
                parseFloat(row.entryPrice)) *
              parseFloat(row.positionAmt)
            ).toFixed(2)
          : "0.00";
        const tpUSDT = tpOrder
          ? (
              (Math.abs(
                parseFloat(tpOrder.stopPrice) - parseFloat(row.entryPrice)
              ) /
                parseFloat(row.entryPrice)) *
              parseFloat(row.positionAmt)
            ).toFixed(2)
          : "0.00";
        return (
          <Box
            key={row.symbol}
            sx={{
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: 2,
              mb: 2,
            }}
          >
            <Stack direction={"row"} spacing={1} alignItems={"center"} mb={2}>
              <PositionDisplay position={row.positionSide} />
              <Typography>{row.symbol}</Typography>
              <Chip
                label={Number(row.initialMargin).toFixed(2) + " USDT"}
                size="small"
                sx={{ borderRadius: 1 }}
              />
            </Stack>
            <Grid container>
              <Grid item xs={4}>
                <Typography sx={{ opacity: 0.8, fontSize: 12 }}>
                  PNL (USDT)
                </Typography>
                <Typography
                  fontWeight={600}
                  color={pnl >= 0 ? "var(--green)" : "var(--red)"}
                >
                  {pnl > 0 ? "+" : ""}
                  {pnl.toFixed(2)}
                </Typography>
              </Grid>
              <Grid xs={4}></Grid>
              <Grid item xs={4}>
                <Typography
                  textAlign={"right"}
                  sx={{ opacity: 0.8, fontSize: 12 }}
                >
                  ROI (%)
                </Typography>
                <Typography
                  textAlign={"right"}
                  fontWeight={600}
                  color={roi >= 0 ? "var(--green)" : "var(--red)"}
                >
                  {roi > 0 ? "+" : ""}
                  {roi.toFixed(2)}%
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                <Typography sx={{ opacity: 0.8, fontSize: 12 }}>SL</Typography>
                <Typography fontWeight={600}>
                  {slUSDT} ({slPercent.toFixed(2)}%)
                </Typography>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Typography
                  textAlign={"right"}
                  sx={{ opacity: 0.8, fontSize: 12 }}
                >
                  TP
                </Typography>
                <Typography textAlign={"right"} fontWeight={600}>
                  {tpUSDT} ({tpPercent.toFixed(2)}%)
                </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Typography
                  sx={{ opacity: 0.8, fontSize: 12 }}
                  textAlign={"right"}
                >
                  Time
                </Typography>
                <Typography fontWeight={600} textAlign={"right"}>
                  {moment(row.updateTime).fromNow()}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
}
