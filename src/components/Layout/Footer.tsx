import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Grid,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";

import VisaLogo from "../../assets/visa-logo-transparent.png";
import MastercardLogo from "../../assets/mastercard-logo-transparent.png";
import PaypalLogo from "../../assets/paypal-logo-transparent.png";
import StripeLogo from "../../assets/stripe-logo-transparent.png";
import NextgenLogo from "../../assets/nextgen-logo-black.png";

const backgroundStyle = {
  flexGrow: 1,
  padding: "40px 0",
  backgroundColor: "#f4f5f7",
  border: "1px lightgrey solid",
};

const logoStyle = {
  position: "absolute",
  top: 0,
  left: -60,
  height: 50,
  width: 45,
};

const linkStyle = {
  cursor: "pointer",
  letterSpacing: 0.5,
  typography: { lg: "body1", xs: "body2" },
  "&:hover": {
    color: "orangered",
  },
};

const bodyStyle = {
  typography: { lg: "body1", xs: "body2" },
};

const paymentData = [
  {
    img: VisaLogo,
    title: "Visa",
  },
  {
    img: MastercardLogo,
    title: "Mastercard",
  },
  {
    img: PaypalLogo,
    title: "Paypal",
  },
  {
    img: StripeLogo,
    title: "Stripe",
  },
];

function Footer() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 900);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 900);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box sx={backgroundStyle}>
      {/* Desktop and tablet layout */}
      {!isMobile && (
        <Stack direction="row" justifyContent="space-evenly">
          <Stack direction="column">
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ position: "relative" }}
            >
              <Box
                component="img"
                alt="Next Gen logo"
                src={NextgenLogo}
                sx={logoStyle}
              />
              NEXTGEN
            </Typography>
            <Typography sx={bodyStyle}>Nextgen Gaming</Typography>
            <Typography sx={bodyStyle}>Skenderija 1</Typography>
            <Typography sx={bodyStyle}>71000 Sarajevo</Typography>
            <Typography sx={bodyStyle}>Bosnia and Herzegovina</Typography>
            <Typography sx={bodyStyle}>Phone: (+387) 62 316-666</Typography>
            <Typography sx={bodyStyle}>info@nextgengaming.com</Typography>
          </Stack>
          <Stack direction="column">
            <Typography fontWeight={700} letterSpacing={0.6} mb={1}>
              Popular categories
            </Typography>
            <Typography
              component="span"
              sx={linkStyle}
              onClick={() => navigate("/category/keyboards")}
            >
              Keyboards
            </Typography>
            <Typography
              component="span"
              sx={linkStyle}
              onClick={() => navigate("/category/mice")}
            >
              Mice
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={linkStyle}
              onClick={() => navigate("/category/mousepads")}
            >
              Mousepads
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={linkStyle}
              onClick={() => navigate("/category/monitors")}
            >
              Monitors
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={linkStyle}
              onClick={() => navigate("/category/chairs")}
            >
              Gaming Chairs
            </Typography>
          </Stack>
          <Stack direction="column">
            <Typography
              variant="body1"
              fontWeight={700}
              letterSpacing={0.6}
              mb={1}
            >
              Customer service
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={linkStyle}
              onClick={() => navigate("/faq")}
            >
              Frequently asked questions (FAQ)
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={linkStyle}
              onClick={() => navigate("/terms-conditions")}
            >
              Terms & Conditions
            </Typography>
            <Typography
              variant="body1"
              component="span"
              sx={linkStyle}
              onClick={() => navigate("/customer-service")}
            >
              Customer service
            </Typography>
          </Stack>
          <ImageList
            cols={2}
            rowHeight={55}
            gap={15}
            sx={{ width: 170, height: 130 }}
          >
            {paymentData.map((item) => (
              <ImageListItem
                key={item.img}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <img
                  loading="lazy"
                  alt={item.title}
                  src={`${item.img}`}
                  srcSet={`${item.img}`}
                  style={{ width: 75, height: 50 }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Stack>
      )}

      {/* Mobile layout */}
      {isMobile && (
        <Box sx={{ width: "85%", margin: "0 auto" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Stack direction="column">
                <Typography
                  variant="h6"
                  fontWeight={700}
                  sx={{ position: "relative" }}
                >
                  NEXTGEN
                  <Box
                    component="img"
                    alt="Next Gen logo"
                    src={NextgenLogo}
                    sx={{ height: 30, width: 25, mb: -1, ml: 1 }}
                  />
                </Typography>
                <Typography sx={bodyStyle}>Nextgen Gaming</Typography>
                <Typography sx={bodyStyle}>Skenderija 1</Typography>
                <Typography sx={bodyStyle}>71000 Sarajevo</Typography>
                <Typography sx={bodyStyle}>Bosnia and Herzegovina</Typography>
                <Typography sx={bodyStyle}>Phone: (+387) 62 316-666</Typography>
                <Typography sx={bodyStyle}>info@nextgengaming.com</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <ImageList
                cols={2}
                rowHeight={55}
                gap={10}
                sx={{ width: 170, height: 130 }}
              >
                {paymentData.map((item) => (
                  <ImageListItem
                    key={item.img}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <img
                      loading="lazy"
                      alt={item.title}
                      src={`${item.img}`}
                      srcSet={`${item.img}`}
                      style={{ width: 72, height: 50 }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="column">
                <Typography fontWeight={700} letterSpacing={0.6} mb={1}>
                  Popular categories
                </Typography>
                <Typography
                  component="span"
                  sx={linkStyle}
                  onClick={() => navigate("/category/keyboards")}
                >
                  Keyboards
                </Typography>
                <Typography
                  component="span"
                  sx={linkStyle}
                  onClick={() => navigate("/category/mice")}
                >
                  Mice
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={linkStyle}
                  onClick={() => navigate("/category/mousepads")}
                >
                  Mousepads
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={linkStyle}
                  onClick={() => navigate("/category/monitors")}
                >
                  Monitors
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={linkStyle}
                  onClick={() => navigate("/category/chairs")}
                >
                  Gaming Chairs
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack direction="column">
                <Typography
                  variant="body1"
                  fontWeight={700}
                  letterSpacing={0.6}
                  mb={1}
                >
                  Customer service
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={linkStyle}
                  onClick={() => navigate("/faq")}
                >
                  Frequently asked questions (FAQ)
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={linkStyle}
                  onClick={() => navigate("/terms-conditions")}
                >
                  Terms & Conditions
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  sx={linkStyle}
                  onClick={() => navigate("/customer-service")}
                >
                  Customer service
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default Footer;
