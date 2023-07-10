import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  TextField,
  Typography,
  styled,
} from "@mui/material";

// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import NextgenLogo from "../../assets/nextgen-logo-black.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { userActions } from "../../store/user-slice";

interface LoginProps {
  handleClose: () => void;
}

function LoginForm({ handleClose }: LoginProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user);
  console.log(userData);

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
      const existingUsersData = await existingUsersResponse.json();

      for (const user in existingUsersData) {
        const existingUserEmail: string = existingUsersData[user].email;
        const existingUserPassword: string = existingUsersData[user].password;
        const existingName: string = existingUsersData[user].firstName;
        const userData = existingUsersData[user];

        if (existingUserEmail === email && existingUserPassword === password) {
          dispatch(userActions.loginUser(userData));
          handleClose();
          break;
        } else if (existingUserEmail !== email) {
          setShowEmailError(true);
        } else if (
          existingUserEmail === email &&
          existingUserPassword !== password
        ) {
          setShowEmailError(false);
          setShowPasswordError(true);
          break;
        }
      }
    } catch (err) {
      throw new Error(
        "There was a problem with the sign-in feature. Please refresh and try again."
      );
    }
  };

  return (
    <Container component="div" maxWidth="xs">
      <Box
        sx={{
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
        <Typography component="h1" variant="h5" mt={2}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
              "Sorry, we can't find an account with this email address. Try creating a new account (LINK)"
            }
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
            sx={{ mt: 1.5, mb: 2, backgroundColor: "orangered", height: 45 }}
            onClick={() => {
              handleClose();
              navigate("/signup");
            }}
          >
            Register
          </Button>
          <Box display="flex" justifyContent="center" mt={1}>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginForm;

/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */
