import { GitHub, LinkedIn, NightsStay, WbSunny } from "@mui/icons-material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import {
  Box,
  Container,
  CssBaseline,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import Cloud from "components/Cloud";
import Footer from "components/Footer";
import React from "react";
import { ToastContainer } from "react-toastify";
export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function saveMode(mode: "light" | "dark") {
  localStorage.setItem("colorMode", mode);
}

function loadMode() {
  return localStorage.getItem("colorMode") === "dark" ? "dark" : "light";
}

export default function LayoutMode({ children }: any) {
  const [mode, setMode] = React.useState<"light" | "dark">(loadMode());
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === "light" ? "dark" : "light";
          saveMode(newMode);
          return newMode;
        });
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer theme={mode} />
        <Cloud />
        <Box
          sx={{
            bgcolor: "background.default",
          }}
          component={"div"}
        >
          <Grid container spacing={10}>
            <Grid item xs={12}>
              <Container maxWidth="md">
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  sx={{ my: 5, mt: 5 }}
                  alignItems={"center"}
                >
                  <Link href="/" underline="none" color="inherit">
                    <Typography variant="h4">Riley.</Typography>
                  </Link>
                  <Stack direction={"row"} alignItems={"center"}>
                    <Link href="/trading" underline="none" color="inherit">
                      <IconButton>
                        <CurrencyExchangeIcon />
                      </IconButton>
                    </Link>
                    <Link href="https://github.com/rileymtt" target="_blank">
                      <IconButton>
                        <GitHub />
                      </IconButton>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/riley-tran-a19b331b0/"
                      target="_blank"
                    >
                      <IconButton>
                        <LinkedIn />
                      </IconButton>
                    </Link>
                    <IconButton onClick={colorMode.toggleColorMode}>
                      {mode === "dark" ? <NightsStay /> : <WbSunny />}
                    </IconButton>
                  </Stack>
                </Stack>
                <Divider />
              </Container>
            </Grid>
            <Grid item xs={12}>
              {children}
            </Grid>
            <Grid item xs={12}>
              <Footer />
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
