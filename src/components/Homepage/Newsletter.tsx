import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  subscribeToNewsletter,
  addToSubscribersList,
} from "../../store/user-actions";
import validateInput from "../../util/validate-input";

import {
  Alert,
  Box,
  Button,
  Container,
  InputBase,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const formStyle = {
  display: "flex",
  alignItems: "center",
  width: 400,
  height: 50,
  p: "2px 4px",
};

const SubscribeButton = styled(Button)(({ theme }) => ({
  backgroundColor: "orangered",
  "&:hover": {
    backgroundColor: "#d03c06",
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
    minWidth: 120,
  },
}));

function Newsletter() {
  const dispatch = useAppDispatch();
  const userData = useSelector((state: RootState) => state.user);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean | null>(null);

  const handleSubscribe = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    event.preventDefault();

    const validInput = validateInput("email", currentInput);

    if (validInput) {
      setCurrentInput("");
      setEmailValid(true);
      setTimeout(() => {
        setEmailValid(null);
      }, 2000);

      userData.loggedIn && userData.email === currentInput
        ? dispatch(subscribeToNewsletter(userData))
        : dispatch(addToSubscribersList(currentInput));
    } else {
      setEmailValid(false);
      setTimeout(() => {
        setEmailValid(null);
      }, 2000);
    }
  };

  return (
    <Container sx={{ mb: 8, height: 160 }}>
      <Typography variant="h5" fontWeight={700} textAlign="center" mb={1}>
        Sign up for our newsletter
      </Typography>
      <Typography
        variant="subtitle1"
        color="GrayText"
        textAlign="center"
        mb={3}
      >
        Get exclusive news, receive great offers and much more!
      </Typography>

      <Box
        component="form"
        display="flex"
        justifyContent="center"
        onSubmit={handleSubscribe}
      >
        <Paper elevation={3} sx={formStyle}>
          <InputBase
            placeholder="Your e-mail address"
            inputProps={{ "aria-label": "your e-mail address", maxLength: 50 }}
            value={currentInput}
            sx={{ ml: 1, flex: 1 }}
            onChange={(e) => {
              setEmailValid(null);
              setCurrentInput(e.target.value);
            }}
          />
        </Paper>
        <SubscribeButton
          variant="contained"
          endIcon={<EmailIcon />}
          onClick={handleSubscribe}
        >
          Subscribe
        </SubscribeButton>
      </Box>
      {emailValid && (
        <Alert severity="success" sx={{ width: 540, margin: "0 auto", mt: 2 }}>
          You are now successfully subscribed to our newsletter.
        </Alert>
      )}
      {emailValid === false && (
        <Alert severity="error" sx={{ width: 540, margin: "0 auto", mt: 2 }}>
          Email must contain @ and be under 50 characters long.
        </Alert>
      )}
    </Container>
  );
}

export default Newsletter;
