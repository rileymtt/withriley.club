import { Box } from "@mui/material";
import React from "react";

export default function PercentNumberComponent(props: { value: number }) {
  const color = React.useMemo(() => {
    if (props.value > 0) {
      return "green";
    } else if (props.value < 0) {
      return "red";
    } else {
      return "unset";
    }
  }, [props.value]);

  const value = React.useMemo(() => {
    if (!props.value) return "0.00";
    if (props.value > 0) {
      return `+${props.value.toFixed(2)}`;
    }
    return props.value.toFixed(2);
  }, [props.value]);

  return <Box color={color}>{value}</Box>;
}
