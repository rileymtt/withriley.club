import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MainProvider } from "providers/MainProvider";
import React from "react";

export default function PositionsDesktop() {
  const { positions, orders, selectedPosition } = MainProvider.useState();
  const { update } = MainProvider.useAction();

  React.useEffect(() => {
    if (!selectedPosition && positions.length > 0) {
      update({ selectedPosition: positions[0] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions, selectedPosition]);

  const handleRowClick = (position: TBinancePosition) => {
    update({ selectedPosition: position });
  };

  positions.sort((a, b) => {
    return parseFloat(b.unRealizedProfit) - parseFloat(a.unRealizedProfit);
  });

  return (
    <Box
      sx={{
        display: {
          md: "block",
          xs: "none",
        },
      }}
    >
      <TableContainer component={Paper} sx={{ height: 540 }} variant="outlined">
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="left">Symbol</TableCell>
              <TableCell align="right">Margin</TableCell>
              <TableCell align="right">PnL</TableCell>
              <TableCell align="right">ROI</TableCell>
              {/* <TableCell align="right">Entry</TableCell>
                <TableCell align="right">Mark</TableCell>
                <TableCell align="right">TP</TableCell>
                <TableCell align="right">SL</TableCell>
                <TableCell align="right">%TP</TableCell>
                <TableCell align="right">%SL</TableCell> */}
              <TableCell align="right">TP</TableCell>
              <TableCell align="right">SL</TableCell>
              {/* <TableCell align="right">Time</TableCell> */}
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
              //estimate USDT loss/gain on TP/SL
              const tpUSDT = Math.abs(
                (diffEntryToTp / parseFloat(row.entryPrice)) *
                  parseFloat(row.notional)
              ).toFixed(2);
              const slUSDT = (
                Math.abs(
                  (diffEntryToSl / parseFloat(row.entryPrice)) *
                    parseFloat(row.notional)
                ) * -1
              ).toFixed(2);
              return (
                <TableRow
                  key={row.symbol}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    position: "relative",
                  }}
                  onClick={() => handleRowClick(row)}
                >
                  <TableCell align="left">{row.symbol}</TableCell>
                  <TableCell align="right">
                    {Number(row.initialMargin).toFixed(2)}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      fontWeight: "bold",
                    }}
                    className={pnl >= 0 ? "green-text" : "red-text"}
                  >
                    {parseFloat(row.unRealizedProfit) > 0 ? "+" : ""}
                    {parseFloat(row.unRealizedProfit).toFixed(2)}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: "bold",
                    }}
                    className={roi >= 0 ? "green-text" : "red-text"}
                  >
                    {roi > 0 ? "+" : ""}
                    {roi.toFixed(2)}%
                  </TableCell>
                  {/* <TableCell align="right">{row.entryPrice}</TableCell>
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
                    </TableCell> */}
                  <TableCell align="right">{tpUSDT}</TableCell>
                  <TableCell align="right">{slUSDT}</TableCell>
                  {/* <TableCell align="right">
                    {moment(row.updateTime).fromNow()}
                  </TableCell> */}
                  {roi > 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        height: "100%",
                        width: `${tpPercent}%`,
                        backgroundColor: "var(--green)",
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
                        backgroundColor: "var(--red)",
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
                    bgcolor={
                      row.positionSide === "LONG"
                        ? "var(--green)"
                        : "var(--red)"
                    }
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
    </Box>
  );
}

export const PositionDisplay = ({
  position,
}: {
  position: "LONG" | "SHORT";
}) => {
  return (
    <Box
      sx={{
        width: 14,
        height: 14,
        bgcolor: position === "LONG" ? "var(--green)" : "var(--red)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 12,
        borderRadius: 0.5,
        color: "white",
      }}
    >
      {position === "LONG" ? "L" : "S"}
    </Box>
  );
};
