import React from "react";
import { MainProvider } from "../providers/MainProvider";
import { initSocket, socket } from "../utils/socket";

export default function Cloud() {
  const { update } = MainProvider.useAction();

  React.useEffect(() => {
    initSocket(null);
    socket.on(
      "positions_update",
      ({ account, positions, orders, settings }) => {
        console.log("positions_update", {
          account,
          positions,
          orders,
          settings,
        });
        update({ account, positions, orders: orders || [], settings });
        const pnl = parseFloat(account?.totalUnrealizedProfit || "0");
        document.title = `${pnl > 0 ? "+" : ""}${pnl.toFixed(
          2
        )} | WFB - Woff Futures Trading Bot`;
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
