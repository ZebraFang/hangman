import { Box, Typography, Modal, Divider } from "@mui/material";

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

function YouLost(props) {
  return (
    <div>
      <Modal
        open
        onClose={props.resetGame}
        aria-labelledby="help-title"
        aria-describedby="help-description"
      >
        <Box sx={style}>
          <Typography id="help-title" variant="h6" component="h2">
            <strong>HANGMAN</strong>
          </Typography>
          <Typography id="help-description" sx={{ mt: 2 }}>
            YOU LOST!
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="h4" component="p">
            The word was: {props.word}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default YouLost;
