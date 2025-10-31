import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { MainProvider } from "providers/MainProvider";
export default function PNL() {
  const { account } = MainProvider.useState();
  const pnl = account?.totalUnrealizedProfit
    ? parseFloat(account.totalUnrealizedProfit)
    : 0;
  const pnlColor = pnl >= 0 ? "green" : "red";
  const roi = account?.totalMarginBalance
    ? (pnl / parseFloat(account.totalMarginBalance)) * 100
    : 0;
  return (
    <Paper sx={{ p: 2 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Typography color="text.secondary">PNL</Typography>
          <Typography variant="h4" sx={{ my: 1 }} color={pnlColor} fontWeight={900}>
            {pnl >= 0 ? "+" : ""}
            {pnl.toFixed(2)}
          </Typography>
          <Typography color="text.secondary">
            {roi >= 0 ? "+" : ""}
            {roi.toFixed(2)}%
          </Typography>
        </Box>
        <AttachMoneyIcon
          sx={{
            fontSize: 48,
            color: "grey",
          }}
        />
      </Stack>
    </Paper>
  );
}
