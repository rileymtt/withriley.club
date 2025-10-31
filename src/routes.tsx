import Homepage from "pages/Homepage";
import TradingPage from "pages/TradingPage";
import { useRoutes } from "react-router-dom";

export default function Router() {
  return useRoutes([
    {
      path: "*",
      element: <Homepage />,
    },
    {
      path: "/trading",
      element: <TradingPage />,
    },
  ]);
}
