import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import EmailIcon from "@mui/icons-material/Email";

import { Box, Button, Container, Stack, Typography } from "@mui/material";

function Newsletter() {
  return (
    <Container
      sx={{
        marginBottom: 8,
        height: 160,
      }}
    >
      <Typography variant="h5" fontWeight={700} textAlign="center" mb={1}>
        Sign up for our newsletter
      </Typography>
      <Typography
        variant="subtitle1"
        textAlign="center"
        color="GrayText"
        mb={3}
      >
        Get exclusive news, receive great offers and much more!
      </Typography>
      <Box display="flex" justifyContent="center">
        <Paper
          component="form"
          elevation={3}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            height: 50,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Your e-mail address"
            inputProps={{ "aria-label": "your e-mail address" }}
          />
        </Paper>
        <Button
          variant="contained"
          endIcon={<EmailIcon />}
          sx={{ backgroundColor: "orangered" }}
        >
          Subscribe
        </Button>
      </Box>
    </Container>
  );
}

export default Newsletter;
