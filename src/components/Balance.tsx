import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { MainProvider } from "providers/MainProvider";
export default function Balance() {
  const { account } = MainProvider.useState();

  const totalMarginBalance = account?.totalMarginBalance
    ? parseFloat(account.totalMarginBalance)
    : 0;
  const walletBalance = account?.totalWalletBalance
    ? parseFloat(account.totalWalletBalance)
    : 0;

  return (
    <Paper sx={{ p: 2 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Typography color="text.secondary">Balance</Typography>
          <Typography variant="h4" sx={{ my: 1 }} fontWeight={900}>
            {totalMarginBalance.toFixed(2)}{" "}
            <Box component="span" fontSize={20}>
              USDT
            </Box>
          </Typography>
          <Typography color="text.secondary">
            {walletBalance.toFixed(2)} <small>USDT</small>
          </Typography>
        </Box>
        <AccountBalanceIcon
          sx={{
            fontSize: 48,
            color: "grey",
          }}
        />
      </Stack>
    </Paper>
  );
}
