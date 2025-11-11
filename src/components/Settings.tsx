import { Grid, Paper, Typography } from "@mui/material";
import { MainProvider } from "providers/MainProvider";

export default function Settings() {
  const { settings } = MainProvider.useState();
  return (
    // <TableContainer
    //   component={Paper}
    //   sx={{ maxHeight: 220 }}
    //   variant="outlined"
    // >
    //   <Table aria-label="simple table" stickyHeader>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell align="left">Key</TableCell>
    //         <TableCell align="left">Value</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {Object.entries(settings).map(([key, value]) => (
    //         <TableRow key={key}>
    //           <TableCell align="left">{key}</TableCell>
    //           <TableCell align="left">{value}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
    <Grid container spacing={1}>
      {Object.entries(settings).map(([key, value]) => (
        <Grid item md={1.5} xs={4} key={key}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="body1">{key}</Typography>
            <Typography variant="body2">{value}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
