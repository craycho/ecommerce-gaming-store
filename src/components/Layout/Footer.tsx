import {
  Box,
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
  backgroundColor: "#f4f5f7",
  padding: "40px 0",
  border: "1px lightgrey solid",
  flexGrow: 1,
};

const logoStyle = {
  position: "absolute",
  top: 0,
  left: -60,
  height: 50,
  width: 45,
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
  return (
    <Box sx={backgroundStyle}>
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
          <Typography variant="body1">Nextgen Gaming</Typography>
          <Typography variant="body1">Skenderija 1</Typography>
          <Typography variant="body1">71000 Sarajevo</Typography>
          <Typography variant="body1">Bosnia and Herzegovina</Typography>
          <Typography variant="body1">Phone: (+387) 62 316-666</Typography>
          <Typography variant="body1">info@nextgengaming.com</Typography>
        </Stack>
        <Stack direction="column">
          <Typography variant="body1" fontWeight={700} mb={1}>
            Popular categories
          </Typography>
          <Typography variant="body1">Keyboards</Typography>
          <Typography variant="body1">Mice</Typography>
          <Typography variant="body1">Mousepads</Typography>
          <Typography variant="body1">Monitors</Typography>
          <Typography variant="body1">Gaming Chairs</Typography>
        </Stack>
        <Stack direction="column">
          <Stack direction="column">
            <Typography variant="body1" fontWeight={700} mb={1}>
              Customer service
            </Typography>
            <Typography variant="body1">
              Frequently asked questions (FAQ)
            </Typography>
            <Typography variant="body1">Terms & Conditions</Typography>
            <Typography variant="body1">Customer service</Typography>
          </Stack>
        </Stack>
        <Stack direction="column">
          <Stack direction="column">
            <ImageList
              sx={{ width: 170, height: 130 }}
              cols={2}
              rowHeight={55}
              gap={15}
            >
              {paymentData.map((item) => (
                <ImageListItem
                  key={item.img}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <img
                    src={`${item.img}`}
                    srcSet={`${item.img}`}
                    alt={item.title}
                    loading="lazy"
                    style={{ width: 75, height: 50 }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Footer;
