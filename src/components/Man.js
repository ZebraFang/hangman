import man1 from "../assets/man/state1.gif";
import man2 from "../assets/man/state2.gif";
import man3 from "../assets/man/state3.gif";
import man4 from "../assets/man/state4.gif";
import man5 from "../assets/man/state5.gif";
import man6 from "../assets/man/state6.gif";
import man7 from "../assets/man/state7.gif";
import man8 from "../assets/man/state8.gif";
import man9 from "../assets/man/state9.gif";
import man10 from "../assets/man/state10.gif";
import man11 from "../assets/man/state11.gif";

const levels = [
  man1,
  man2,
  man3,
  man4,
  man5,
  man6,
  man7,
  man8,
  man9,
  man10,
  man11,
];

function Man({ numberOfWrongGuesses }) {
  return <img src={levels[numberOfWrongGuesses]} alt="man" />;
}

export default Man;
