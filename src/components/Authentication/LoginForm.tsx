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

interface LoginProps {
  handleClose: () => void;
}

function LoginForm({ handleClose }: LoginProps) {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
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
