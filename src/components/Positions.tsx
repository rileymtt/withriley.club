import { Box } from "@mui/material";
import PositionsDesktop from "./Positions.Desktop";
import PositionsMobile from "./Positions.Mobile";

export default function Positions() {
  return (
    <>
      <PositionsDesktop />
      <PositionsMobile />
    </>
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
