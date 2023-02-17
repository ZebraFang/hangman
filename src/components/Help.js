import { useState } from "react";
import { Box, Button, Typography, Modal, Divider } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Help() {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        HELP
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="help-title"
        aria-describedby="help-description"
      >
        <Box sx={style}>
          <Typography id="help-title" variant="h6" component="h2">
            <strong>HANGMAN</strong>
          </Typography>
          <Typography id="help-description" sx={{ mt: 2 }}>
            How to play HANGMAN
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2">
            1. When the game loads, we pick a word from our dictionary.
            <br />
            2. It's your task to guess the word.
            <br />
            3. You get <strong>10 guesses</strong>.
            <br />
            4. Guess the word, and you win, but guess wrong 10 times, and you
            lose!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Help;
