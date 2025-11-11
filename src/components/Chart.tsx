// TradingViewWidget.jsx
import { MainProvider } from "providers/MainProvider";
import { memo, useEffect, useRef } from "react";

function TradingViewWidget() {
  const container = useRef<any>();
  const { selectedPosition } = MainProvider.useState();

  useEffect(() => {
    if (!selectedPosition?.symbol) return;
    const script = document.createElement("script");
    container.current.innerHTML = "";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
        {
          "allow_symbol_change": true,
          "calendar": false,
          "details": false,
          "hide_side_toolbar": true,
          "hide_top_toolbar": false,
          "hide_legend": false,
          "hide_volume": false,
          "hotlist": false,
          "interval": "4H",
          "locale": "en",
          "save_image": true,
          "style": "1",
          "symbol": "BINANCE:${selectedPosition?.symbol}.P",
          "theme": "dark",
          "timezone": "Etc/UTC",
          "backgroundColor": "#0F0F0F",
          "gridColor": "rgba(242, 242, 242, 0.06)",
          "watchlist": [],
          "withdateranges": false,
          "compareSymbols": [],
          "studies": [],
          "autosize": true
        }`;
    container.current.appendChild(script);
  }, [selectedPosition?.symbol]);

  return (
    <div
      className="tradingview-widget-container"
      ref={container}
      style={{ height: "100%", width: "100%", minHeight: 400 }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      ></div>
    </div>
  );
}

export default memo(TradingViewWidget);
