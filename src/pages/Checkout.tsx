import { useState, useEffect } from "react";
import { CountryType } from "../components/Checkout/CountryDropdown";

import CountryDropdown from "../components/Checkout/CountryDropdown";
import DeliveryPicker from "../components/Checkout/DeliveryPicker";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import CheckoutCart from "../components/Checkout/CheckoutCart";

import {
  Box,
  Container,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";

const MobileCartPreview = styled(Box)(({ theme }) => ({
  display: "none",

  [theme.breakpoints.down("sm")]: {
    display: "block",
    width: "100%",
  },
}));

const PaperWrapper = styled(Paper)(({ theme }) => ({
  width: 550,
  padding: "1.2rem 1.5rem",
  margin: "1.5rem 0",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

function CheckoutPage() {
  // Type assertion. "Overwriteamo" tip jer znamo bolje koji ce biti od automatskog inferanja. Slicno :ProductData ali poredi subtypes a ne exact types.
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>(
    null
  );
  const [countryError, setCountryError] = useState<boolean | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ width: { sm: "83%", xs: "95%" }, margin: "0 auto" }}>
      <MobileCartPreview>
        <Typography variant="h6" fontWeight={700} mt={2} mb={2} ml={2}>
          Order preview:
        </Typography>
        <CheckoutCart deliveryMethod={deliveryMethod} />
      </MobileCartPreview>
      <Stack direction="row" spacing={2} justifyContent="center" mb={5} mt={5}>
        <Container>
          <Typography variant="h6" fontWeight={700}>
            1. Delivery method
          </Typography>
          <Typography variant="body2" color="GrayText" mt={1} mb={1}>
            Country
          </Typography>
          {countryError && (
            <Typography variant="body2" color="red" mb={1}>
              Please select a country first.
            </Typography>
          )}
          <CountryDropdown
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            setCountryError={setCountryError}
          />

          <PaperWrapper elevation={3}>
            <DeliveryPicker
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
            />
          </PaperWrapper>
          <Typography variant="h6" fontWeight={700} mt={4}>
            2. Payment
          </Typography>
          <PaperWrapper elevation={3}>
            <Typography variant="subtitle1" fontSize={18} fontWeight={700}>
              Your information
            </Typography>
            <CheckoutForm
              selectedCountry={selectedCountry}
              setCountryError={setCountryError}
              deliveryMethod={deliveryMethod}
            />
          </PaperWrapper>
        </Container>
        <Box sx={{ display: { sm: "contents", xs: "none" }, width: "100%" }}>
          <CheckoutCart deliveryMethod={deliveryMethod} />
        </Box>
      </Stack>
    </Box>
  );
}

export default CheckoutPage;
