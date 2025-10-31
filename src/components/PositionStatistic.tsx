import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { MainProvider } from "providers/MainProvider";
export default function PositionStatistic() {
  const { positions } = MainProvider.useState();
  const count = positions.length;
  const longCount = positions.filter(
    (pos) => pos.positionSide === "LONG"
  ).length;
  const shortCount = positions.filter(
    (pos) => pos.positionSide === "SHORT"
  ).length;

  return (
    <Paper sx={{ p: 2 }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Typography color="text.secondary">Position Count</Typography>
          <Typography variant="h4" sx={{ my: 1 }} fontWeight={900}>
            {count}
          </Typography>
          <Typography color="text.secondary">
            Long: {longCount} | Short: {shortCount}
          </Typography>
        </Box>
        <FeaturedPlayListIcon
          sx={{
            fontSize: 48,
            color: "grey",
          }}
        />
      </Stack>
    </Paper>
  );
}
