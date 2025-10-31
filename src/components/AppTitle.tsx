import { Box, BoxProps } from "@mui/material";
import { titleHeight } from "configs";

export default function AppTitle(props: BoxProps) {
  return (
    <Box
      height={titleHeight}
      display={"flex"}
      alignItems={"flex-start"}
      {...props}
    />
  );
}
