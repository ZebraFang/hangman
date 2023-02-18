import React, { useState, useEffect, useCallback } from "react";
import { Box, Divider, Typography } from "@mui/material";

import Man from "./components/Man";
import Help from "./components/Help";
import YouWon from "./components/YouWon";
import YouLost from "./components/YouLost";

function App() {
  // our dictionary
  const [words, setWords] = useState([]);

  // our random word (as a string)
  const [word, setWord] = useState("");

  // our word (as a "smart" object)
  const [smartWord, setSmartWord] = useState([]);

  // wrong guesses
  const [wrongGuesses, setWrongGuesses] = useState([]);

  // all guesses
  const [allGuesses, setAllGuesses] = useState([]);

  // count of correct guesses
  const [revealedCount, setRevealedCount] = useState(0);

  const resetGame = () => {
    // reset all the state to before any guesses were made
    setWord("");
    setWrongGuesses([]);
    setAllGuesses([]);
    setRevealedCount(0);
    setSmartWord([]);

    // load a new word
    pickRandomWord();
  };

  const pickRandomWord = useCallback(() => {
    if (words.length) {
      // pick a random word
      const wordNumber = Math.round(Math.random() * words.length);
      const selectedWord = words[wordNumber].toLowerCase();

      // set the state, and begin the game!

      const letters = selectedWord.split("");

      // loop through the letters...
      const theWord = letters.map((letter) => {
        // ...and:
        // create a object for each letter that tells us:
        //  1. the letter
        //  2. (boolean) revealed state

        return { char: letter, revealed: false };
      });

      // TODO: Delete this so we don't reveal the word in the console!
      console.log({ theWord });
      console.log({ selectedWord });

      setSmartWord(theWord);
      setWord(selectedWord);
    }
  }, [words]);

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
        const allWords = withoutHeader.split("\n");

        setWords(allWords);

        pickRandomWord();

        //
      } else {
        // Could not load the dictionary!
        console.error("Could not load the dictionary!");
      }
    };

    if (!word.length) {
      getDictionary();
    }
  }, [word, pickRandomWord]);

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
        // if yes: reveal all the matching letters

        const newSmartWord = smartWord.map((element) => {
          if (key === element.char) {
            element.revealed = true;
          }

          return element;
        });

        // update the state
        setSmartWord(newSmartWord);

        // create a new array of revealed letters
        const revealedLetters = newSmartWord.filter((element) => {
          if (element.revealed === true) {
            return true;
          }

          return false;
        });

        // count how many letters have been revealed
        setRevealedCount(revealedLetters.length);

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
    [allGuesses, smartWord, word]
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

      {revealedCount === smartWord.length ? (
        <YouWon word={word} resetGame={resetGame} />
      ) : null}

      {wrongGuesses.length === 10 ? (
        <YouLost word={word} resetGame={resetGame} />
      ) : null}

      <Man numberOfWrongGuesses={wrongGuesses.length} />

      <Box
        sx={{
          gap: 2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        {smartWord.map((letter, i) => {
          return (
            <Typography key={`letter-${i}`} variant="h1" component="p">
              {/**
               * If statement saying if the character has been revealed render
               *  the character otherwise render an underscore
               */}
              {letter.revealed ? letter.char : "_"}
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
