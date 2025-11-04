import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MainProvider } from "providers/MainProvider";

export default function Settings() {
  const { settings } = MainProvider.useState();
  return (
    <TableContainer
      component={Paper}
      sx={{ maxHeight: 220 }}
      variant="outlined"
    >
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="left">Key</TableCell>
            <TableCell align="left">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(settings).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell align="left">{key}</TableCell>
              <TableCell align="left">{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
