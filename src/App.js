import React, { useState, useEffect } from "react";
import { Box, Divider, Typography } from "@mui/material";

import man7 from "./assets/man/state7.gif";

import Help from "./components/Help";

function App() {
  const [word, setWord] = useState("");

  // Use a side effect to load the dictionary and select a random word
  useEffect(() => {
    // Load the dictionary file
    //  parse it, and then,
    //  select a random word from the list
    const getDictionary = async () => {
      const loaded = await fetch("/dictionary.txt");

      if (loaded) {
        const text = await loaded.text();

        // get rid of the header text
        const withoutHeader = text.split("START\n")[1];

        // split the rest of the dictionary into an array we can use
        const words = withoutHeader.split("\n");

        // pick a random word
        const wordNumber = Math.round(Math.random() * words.length);
        const selectedWord = words[wordNumber].toLowerCase();

        // set the state, and begin the game!
        console.log({ selectedWord });
        setWord(selectedWord);

        //
      } else {
        // Could not load the dictionary!
        console.error("Could not load the dictionary!");
      }
    };

    getDictionary();
  }, []);

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
        {word.split("").map((letter, i) => {
          return (
            <Typography key={`letter-${i}`} variant="h1" component="p">
              {letter}
            </Typography>
          );
        })}
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
