import * as React from "react";
import { Box, Divider, Typography } from "@mui/material";

import man7 from "./assets/man/state7.gif";

import Help from "./components/Help";

function App() {
  return (
    <Box sx={{ p: 5, textAlign: "center" }}>
      <Typography variant="h3" component="h1">
        HANGMAN
      </Typography>

      <Help />

      <img src={man7} alt="man" />

      <Box
        sx={{
          gap: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Typography variant="h1" component="p">
          d
        </Typography>
        <Typography variant="h1" component="p">
          _
        </Typography>
        <Typography variant="h1" component="p">
          _
        </Typography>
        <Typography variant="h1" component="p">
          _
        </Typography>
        <Typography variant="h1" component="p">
          _
        </Typography>
        <Typography variant="h1" component="p">
          _
        </Typography>
        <Typography variant="h1" component="p">
          _
        </Typography>
        <Typography variant="h1" component="p">
          _
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" component="h3">
        Guesses (3/10)
      </Typography>

      <Box
        sx={{
          gap: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Typography variant="h2" component="p">
          s
        </Typography>
        <Typography variant="h2" component="p">
          g
        </Typography>
        <Typography variant="h2" component="p">
          x
        </Typography>
      </Box>
    </Box>
  );
}

export default App;
