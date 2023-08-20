import { Canvas } from "@react-three/fiber";
import "styles/index.css";

import { OrbitControls } from "@react-three/drei";
import React from "react";
import Model from "./components/Model";
import LayoutMode from "./providers/LayoutMode";
import { Box, Grid, Paper } from "@mui/material";

function App() {
  const [refresh, setRefresh] = React.useState(false);

  return (
    <LayoutMode>
      <Grid container>
        <Grid item md={6} xs={12} spacing={5}>
          <Paper>
            <Box component={"div"} position={"relative"} height="500px">
              <Canvas camera={{ position: [-20, 0, 40] }}>
                <ambientLight intensity={1} />
                <OrbitControls
                  makeDefault
                  maxPolarAngle={Math.PI / 2.3}
                  minPolarAngle={Math.PI / 2.3}
                />
                <Model refresh={refresh} />
              </Canvas>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  paddingBottom: 50,
                  zIndex: 999,
                }}
              >
                <button
                  onClick={() => setRefresh(!refresh)}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Refresh
                </button>
              </div>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </LayoutMode>
  );
}

export default App;
