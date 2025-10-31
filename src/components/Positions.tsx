import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { MainProvider } from "providers/MainProvider";

export default function Positions() {
  const { positions, account, orders } = MainProvider.useState();

  positions.sort((a, b) => {
    return parseFloat(b.unRealizedProfit) - parseFloat(a.unRealizedProfit);
  });

  // const sl = parseFloat(account?.totalWalletBalance || "0") * -0.02;
  // const tp = Math.abs(sl) + 1.5;

  return (
    <Box>
      <Grid container>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Symbol</TableCell>
                <TableCell align="right">Margin</TableCell>
                <TableCell align="right">PnL</TableCell>
                <TableCell align="right">ROI</TableCell>
                <TableCell align="right">Entry</TableCell>
                <TableCell align="right">Mark</TableCell>
                <TableCell align="right">TP</TableCell>
                <TableCell align="right">SL</TableCell>
                <TableCell align="right">%TP</TableCell>
                <TableCell align="right">%SL</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {positions.map((row) => {
                const pnl = parseFloat(row.unRealizedProfit);
                const roi = (pnl / parseFloat(row.initialMargin)) * 100;
                const tpOrder = orders.find(
                  (o) =>
                    o.symbol === row.symbol &&
                    o.positionSide === row.positionSide &&
                    o.type === "TAKE_PROFIT_MARKET"
                );
                const slOrder = orders.find(
                  (o) =>
                    o.symbol === row.symbol &&
                    o.positionSide === row.positionSide &&
                    o.type === "STOP_MARKET"
                );
                const diffEntryToTp = tpOrder
                  ? Math.abs(
                      parseFloat(tpOrder.stopPrice) - parseFloat(row.entryPrice)
                    )
                  : 0;
                const diffEntryToMark = Math.abs(
                  parseFloat(row.markPrice) - parseFloat(row.entryPrice)
                );
                const tpPercent = (diffEntryToMark / diffEntryToTp) * 100;
                const diffEntryToSl = slOrder
                  ? Math.abs(
                      parseFloat(row.entryPrice) - parseFloat(slOrder.stopPrice)
                    )
                  : 0;
                const slPercent = (diffEntryToMark / diffEntryToSl) * 100;
                return (
                  <TableRow
                    key={row.symbol}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      position: "relative",
                    }}
                  >
                    <TableCell align="left">{row.symbol}</TableCell>
                    <TableCell align="right">
                      {Number(row.initialMargin).toFixed(2)}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color:
                          parseFloat(row.unRealizedProfit) >= 0
                            ? "green"
                            : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {parseFloat(row.unRealizedProfit) > 0 ? "+" : ""}
                      {parseFloat(row.unRealizedProfit).toFixed(2)}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: roi >= 0 ? "green" : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {roi > 0 ? "+" : ""}
                      {roi.toFixed(2)}%
                    </TableCell>
                    <TableCell align="right">{row.entryPrice}</TableCell>
                    <TableCell align="right">{row.markPrice}</TableCell>
                    <TableCell align="right">
                      {tpOrder ? `${tpOrder.stopPrice}` : `--`}
                    </TableCell>
                    <TableCell align="right">
                      {slOrder ? `${slOrder.stopPrice}` : `--`}
                    </TableCell>
                    <TableCell align="right">
                      {roi > 0 ? `${tpPercent.toFixed(2)}%` : `--`}
                    </TableCell>
                    <TableCell align="right">
                      {roi < 0 ? `${slPercent.toFixed(2)}%` : `--`}
                    </TableCell>
                    <TableCell align="right">
                      {moment(row.updateTime).fromNow()}
                    </TableCell>
                    {roi > 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          height: "100%",
                          width: `${tpPercent}%`,
                          backgroundColor: "#2EBD85",
                          zIndex: 1,
                          top: 0,
                          left: 0,
                          opacity: 0.1,
                        }}
                        component={"td"}
                      />
                    )}
                    {roi < 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          height: "100%",
                          width: `${slPercent}%`,
                          backgroundColor: "#F6465D",
                          zIndex: 1,
                          top: 0,
                          right: 0,
                          opacity: 0.1,
                        }}
                        component={"td"}
                      />
                    )}
                    <Box
                      position={"absolute"}
                      height={"80%"}
                      width={2}
                      bgcolor={row.positionSide === "LONG" ? "green" : "red"}
                      left={0}
                      top={"50%"}
                      sx={{
                        transform: "translateY(-50%)",
                      }}
                      borderRadius={2}
                      component={"td"}
                    />
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Box>
  );
}
