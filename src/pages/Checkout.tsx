import { useEffect } from "react";
import { Params, useLoaderData } from "react-router-dom";
import ProductMain from "../components/Product/ProductMain";

import {
  Autocomplete,
  Box,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CountryDropdown from "../components/Checkout/CountryDropdown";
import DeliveryPicker from "../components/Checkout/DeliveryPicker";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import CheckoutCart from "../components/Checkout/CheckoutCart";

interface ProductData {
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  new: boolean;
  onSale: boolean;
  price: number;
  thumbnail: string;
  title: string;
}

interface Product {
  id: string;
  data: ProductData;
  quantity?: number;
}

function CheckoutPage() {
  // Type assertion. "Overwriteamo" tip jer znamo bolje koji ce biti od automatskog inferanja. Slicno :ProductData ali poredi subtypes a ne exact types.
  const product = useLoaderData() as Product;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ width: "83%", margin: "0 auto" }}>
      <Stack direction="row" spacing={2} justifyContent="center" mb={5}>
        <Container>
          <Typography variant="h6" fontWeight={700} mt={4}>
            1. Delivery method
          </Typography>
          <Typography variant="body2" color="GrayText" mt={1} mb={1}>
            Country
          </Typography>
          <CountryDropdown />
          <Paper
            elevation={3}
            sx={{
              width: "550px",
              padding: "1.2rem 1.5rem",
              margin: "2.5rem 0",
            }}
          >
            <DeliveryPicker />
          </Paper>
          <Typography variant="h6" fontWeight={700} mt={4}>
            2. Payment
          </Typography>
          <Paper
            elevation={3}
            sx={{
              width: "550px",
              padding: "1.2rem 1.5rem",
              margin: "1.5rem 0",
            }}
          >
            <Typography variant="subtitle1" fontSize={18} fontWeight={700}>
              Your information
            </Typography>
            <CheckoutForm />
          </Paper>
        </Container>
        <CheckoutCart />
      </Stack>
    </Box>
  );
}

export default CheckoutPage;

interface LoaderData {
  request: Request;
  params: Params;
}
