import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import { User } from "../../util/type-definitions";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import NextgenLogo from "../../assets/nextgen-logo-black.png";

interface FetchData {
  [key: string]: User; // "Index signature", allows dynamic keys of the same, defined type
}

interface LoginProps {
  handleClose: () => void;
}

function LoginForm({ handleClose }: LoginProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showEmailError, setShowEmailError] = useState<boolean | null>(null);
  const [showPasswordError, setShowPasswordError] = useState<boolean | null>(
    null
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    try {
      const existingUsersResponse = await fetch(
        "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      );
      const existingUsersData: FetchData = await existingUsersResponse.json();

      for (const user in existingUsersData) {
        const existingUserEmail = existingUsersData[user].email;
        const existingUserPassword = existingUsersData[user].password;
        const userData: User = existingUsersData[user];

        if (existingUserEmail === email && existingUserPassword === password) {
          if (rememberMe) {
            localStorage.setItem(
              "userData",
              JSON.stringify({ ...userData, loggedIn: true })
            );
          } else {
            sessionStorage.setItem(
              "userData",
              JSON.stringify({ ...userData, loggedIn: true })
            );
          }
          dispatch(userActions.loginUser(userData));
          handleClose();
          break; // No need to check further iterations
        } else if (existingUserEmail !== email) {
          setShowEmailError(true);
        } else if (
          existingUserEmail === email &&
          existingUserPassword !== password
        ) {
          setShowEmailError(false);
          setShowPasswordError(true);
        }
      }
    } catch (err) {
      throw new Error(
        "There was a problem with the sign-in feature. Please refresh and try again."
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          component="img"
          alt="Next Gen logo"
          src={NextgenLogo}
          sx={{ height: 55 }}
        />
        <Typography variant="h5" mt={2}>
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} mt={1}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={showEmailError === true}
            helperText={
              showEmailError === true &&
              "We can't find an account with this email address. Try creating a new account."
            }
            onChange={() => setShowEmailError(false)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={showPasswordError === true}
            helperText={showPasswordError === true && "Invalid password."}
            onChange={() => setShowPasswordError(false)}
          />
          <FormControlLabel
            label="Remember me"
            control={
              <Checkbox
                color="primary"
                value={rememberMe}
                onChange={() => setRememberMe((prev) => !prev)}
              />
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 3, height: 45 }}
          >
            Sign In
          </Button>
          <Typography variant="body1" textAlign="center">
            Don't have an account?
          </Typography>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{
              mt: 1.5,
              mb: 2,
              height: 45,
              backgroundColor: "orangered",
              "&:hover": {
                backgroundColor: "#d03c06",
              },
            }}
            onClick={() => {
              handleClose();
              navigate("/signup");
            }}
          >
            Register
          </Button>
          <Box display="flex" justifyContent="center" mt={1}>
            <Link href="/" variant="body2">
              Forgot password?
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginForm;
