import { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import validateInput from "../util/validate-input";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import NextgenLogo from "../assets/nextgen-logo-black.png";

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [firstNameValid, setFirstNameValid] = useState<boolean | null>(null);

  const [lastName, setLastName] = useState<string>("");
  const [lastNameValid, setLastNameValid] = useState<boolean | null>(null);

  const [email, setEmail] = useState<string>("");
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [emailError, setEmailError] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);

  const [allowExtraEmails, setAllowExtraEmails] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const firstName = data.get("firstName") as string;
    const lastName = data.get("lastName") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      const existingUsersResponse = await fetch(
        "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      );
      const existingUsersData = await existingUsersResponse.json();

      const validNameInput = validateInput("firstName", firstName);
      setFirstNameValid(validNameInput);
      if (validNameInput) {
        setFirstName(firstName);
      }

      const validLastNameInput = validateInput("lastName", lastName);
      setLastNameValid(validLastNameInput);
      if (validLastNameInput) {
        setLastName(lastName);
      }

      const validEmailInput = validateInput("email", email);
      setEmailValid(validEmailInput);
      if (validEmailInput) {
        let isValid: boolean = true; // setEmailValid je async a email validity je potreban odmah

        for (const user in existingUsersData) {
          const existingUserEmail: string = existingUsersData[user].email;

          if (existingUserEmail === email) {
            isValid = false;
            setEmailValid(false);
            setEmailError(
              "An account with this e-mail address already exists. Please try a different one."
            );
            break;
          }
        }

        // If e-mail passed all if checks
        if (isValid) {
          setEmailValid(true);
          setEmail(email);
        }
      } else {
        setEmailValid(false);
        setEmailError("Email must contain @ and be under 50 characters long.");
      }

      const validPasswordInput = validateInput("password", password);
      setPasswordValid(validPasswordInput);
      if (validPasswordInput) {
        setPassword(password);
      }
    } catch (err) {
      console.log("Error fetching the existing user data.");
      throw new Error(
        "Error fetching the existing user data. Please refresh the page and try again."
      );
    }
  };

  // const dependencies = [
  //   firstName,
  //   firstNameValid,
  //   lastName,
  //   lastNameValid,
  //   email,
  //   emailValid,
  //   password,
  //   passwordValid,
  //   allowExtraEmails,
  //   navigate,
  // ];
  useEffect(() => {
    const postUserData = async () => {
      if (firstNameValid && lastNameValid && emailValid && passwordValid) {
        // console.log("Post request");

        const userData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          allowExtraEmails: allowExtraEmails,
        };

        // Post request
        const response = await fetch(
          "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );

        if (response.status === 422 || response.status === 401) {
          return response;
        }

        if (!response.ok) {
          throw json(
            { message: "Could not submit user data." },
            { status: 500 }
          );
        }

        navigate("/");
      }
    };
    postUserData();
  }, [
    firstName,
    firstNameValid,
    lastName,
    lastNameValid,
    email,
    emailValid,
    password,
    passwordValid,
    allowExtraEmails,
    navigate,
  ]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          alt="Next Gen logo"
          src={NextgenLogo}
          sx={{ height: 55 }}
        />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                required
                fullWidth
                name="firstName"
                id="firstName"
                label="First Name"
                autoComplete="given-name"
                inputProps={{ maxLength: 30 }}
                error={firstNameValid === false}
                helperText={
                  firstNameValid === false &&
                  "First name must be between 1-30 characters and can't contain symbols."
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                inputProps={{ maxLength: 30 }}
                error={lastNameValid === false}
                helperText={
                  lastNameValid === false &&
                  "Last name must be between 1-30 characters and can't contain symbols."
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                inputProps={{ maxLength: 50 }}
                error={emailValid === false}
                helperText={emailValid === false && emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                inputProps={{ maxLength: 100 }}
                error={passwordValid === false}
                helperText={
                  passwordValid === false &&
                  "Password must be at least 8 characters long."
                }
              />
            </Grid>
            <Grid item xs={12} mt={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={allowExtraEmails}
                    color="primary"
                    onChange={() =>
                      setAllowExtraEmails((prevValue) => !prevValue)
                    }
                  />
                }
                label="I want the latest information on offers, news and recommendations."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: 45, backgroundColor: "orangered" }}
          >
            Sign Up
          </Button>
          <Box display="flex" justifyContent="center" mt={1} mb={4}>
            <Link href="#" variant="body2">
              Already have an account? Sign in
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Signup;
