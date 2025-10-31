import SpeedIcon from "@mui/icons-material/Speed";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { MainProvider } from "providers/MainProvider";

export default function MarginRatio() {
  const { account } = MainProvider.useState();
  const totalMaintMargin = account?.totalMaintMargin
    ? parseFloat(account.totalMaintMargin)
    : 0;
  const totalMarginBalance = account?.totalMarginBalance
    ? parseFloat(account.totalMarginBalance)
    : 0;
  const marginRatio =
    totalMarginBalance > 0
      ? ((totalMaintMargin / totalMarginBalance) * 100).toFixed(2) + "%"
      : "N/A";
  const marginRatioColor =
    marginRatio !== "N/A"
      ? parseFloat(marginRatio) < 50
        ? "green"
        : parseFloat(marginRatio) < 80
        ? "orange"
        : "red"
      : "inherit";

  return (
    <Paper sx={{ p: 2 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Typography color="text.secondary">Margin ratio</Typography>
          <Typography variant="h4" sx={{ my: 1 }} color={marginRatioColor} fontWeight={900}>
            {marginRatio}
          </Typography>
          <Typography color="text.secondary">
            {totalMaintMargin.toFixed(2)} USDT
          </Typography>
        </Box>
        <SpeedIcon
          sx={{
            fontSize: 48,
            color: "grey",
          }}
        />
      </Stack>
    </Paper>
  );
}
