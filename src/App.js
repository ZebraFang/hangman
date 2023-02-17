import React, { useState, useEffect, useCallback } from "react";
import { Box, Divider, Typography } from "@mui/material";

import man7 from "./assets/man/state7.gif";

import Help from "./components/Help";

function App() {
  const [word, setWord] = useState("");

  // wrong guesses
  const [wrongGuesses, setWrongGuesses] = useState([]);

  // all guesses
  const [allGuesses, setAllGuesses] = useState([]);

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

  // This is the function we call each time a key is pressed on the keyboard
  const handleKeyPress = useCallback(
    ({ key }) => {
      console.log({ key });

      // check whether we've guessed this letter before,
      //  and if already guessed, ignore it!
      if (allGuesses.includes(key)) {
        return;
      }

      // check whether our selected word contains the letter
      if (word.includes(key)) {
        // if yes: show the letter in the proper place
        // TODO: Figure this out!
        //
        //
      } else {
        // if no:  add it to the wrong guesses
        setWrongGuesses((prev) => {
          return [...prev, key];
        });
      }

      // always: add it to the guesses list
      setAllGuesses((prev) => {
        return [...prev, key];
      });
    },
    [allGuesses, word]
  );

  // Use a side effect to attach a keyboard event listener so we can capture
  //  the user input from their keyboard
  useEffect(() => {
    document.addEventListener("keypress", handleKeyPress);

    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, [handleKeyPress]);

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
        Guesses ({wrongGuesses.length}/10)
      </Typography>

      <Box
        sx={{
          gap: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {wrongGuesses.map((wrongLetter, i) => {
          return (
            <Typography key={`wrong-letter-${i}`} variant="h2" component="p">
              {wrongLetter}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
}

export default App;
