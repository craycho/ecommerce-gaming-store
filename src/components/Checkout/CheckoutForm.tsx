import { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import validateInput from "../../util/validate-input";
import { Order } from "../../util/type-definitions";
import { generateDate } from "../../util/generate-date";
import { CountryType } from "./CountryDropdown";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

interface FormProps {
  selectedCountry: CountryType | null;
  setCountryError: React.Dispatch<React.SetStateAction<boolean | null>>;
  deliveryMethod: number;
}

function CheckoutForm({
  selectedCountry,
  setCountryError,
  deliveryMethod,
}: FormProps) {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);

  const [firstNameValid, setFirstNameValid] = useState<boolean | null>(null);
  const [lastNameValid, setLastNameValid] = useState<boolean | null>(null);
  const [addressValid, setAddressValid] = useState<boolean | null>(null);
  const [postCodeValid, setPostCodeValid] = useState<boolean | null>(null);
  const [emailValid, setEmailValid] = useState<boolean | null>(null);

  const [allowExtraEmails, setAllowExtraEmails] = useState<boolean>(false);
  const [showDemoMessage, setShowDemoMessage] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName") as string;
    const lastName = data.get("lastName") as string;
    const address = data.get("address") as string;
    const postcode = data.get("postcode") as string;
    const email = data.get("email") as string;

    const validNameInput = validateInput("firstName", firstName);
    setFirstNameValid(validNameInput);

    const validLastNameInput = validateInput("lastName", lastName);
    setLastNameValid(validLastNameInput);

    const validAddressInput = /\d/.test(address); // Regex for "does it contain digit"
    setAddressValid(validAddressInput);

    const validPostcodeInput = postcode.length >= 5 && !/\D/.test(postcode); // Does it contain anything other than digit
    setPostCodeValid(validPostcodeInput);

    const validEmailInput: boolean = validateInput("email", email);
    setEmailValid(validEmailInput);

    if (!selectedCountry) {
      setCountryError(true);
      window.scrollTo(0, 0);
    }

    // Places an order if country is selected and all fields are valid
    if (
      selectedCountry &&
      validNameInput &&
      validLastNameInput &&
      validAddressInput &&
      validPostcodeInput &&
      validEmailInput
    ) {
      const date = generateDate(null);

      const orderData: Order = {
        selectedCountry: selectedCountry.label,
        firstName,
        lastName,
        address,
        postcode,
        email,
        allowExtraEmails,
        cart,
        date,
        deliveryMethod,
      };

      // 1. Fetches existing user data to find current user
      const response = await fetch(
        "https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users.json"
      );
      const firebaseUsersData = await response.json();

      for (const user in firebaseUsersData) {
        const firebaseUserEmail: string = firebaseUsersData[user].email;

        if (firebaseUserEmail === userData.email) {
          // 2. Sends order data to Firebase
          const postResponse = await fetch(
            `https://test-ecommerce-2be3f-default-rtdb.europe-west1.firebasedatabase.app/users/${user}/orders.json`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(orderData), // Updates existing attribute
            }
          );

          if (postResponse.status === 422 || postResponse.status === 401) {
            return postResponse;
          }

          if (!postResponse.ok) {
            throw json(
              { message: "Could not submit order data." },
              { status: 500 }
            );
          }

          setShowDemoMessage(true);
          setTimeout(() => {
            setShowDemoMessage(false);
            navigate("/");
          }, 4000);
        }
      }
    }
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={3.5}>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
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
                onChange={() => setFirstNameValid(null)}
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
                onChange={() => setLastNameValid(null)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address & Street number"
                name="address"
                autoComplete="address"
                inputProps={{ maxLength: 100 }}
                error={addressValid === false}
                helperText={
                  addressValid === false &&
                  "Address must contain a street number."
                }
                onChange={() => setAddressValid(null)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="postcode"
                label="Postcode"
                type="postcode"
                id="postcode"
                autoComplete="postcode"
                inputProps={{ maxLength: 100 }}
                error={postCodeValid === false}
                helperText={
                  postCodeValid === false &&
                  "Postcode must contain at least 5 numbers and can't contain characters."
                }
                onChange={() => setPostCodeValid(null)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                autoComplete="email"
                inputProps={{ maxLength: 50 }}
                error={emailValid === false}
                helperText={
                  emailValid === false &&
                  "Email must contain @ and be under 50 characters long."
                }
                onChange={() => setEmailValid(null)}
              />
            </Grid>
            <Grid item xs={12} mt={1}>
              <FormControlLabel
                label="I want the latest information on offers, news and recommendations."
                control={
                  <Checkbox
                    color="primary"
                    value={allowExtraEmails}
                    onChange={() =>
                      setAllowExtraEmails((prevValue) => !prevValue)
                    }
                  />
                }
              />
            </Grid>
          </Grid>
          <Grid item xs={12} mt={2}>
            {showDemoMessage && (
              <Typography color="red" variant="subtitle2">
                Order successful. <br />* This is a demo website and no payment
                gateway has been implemented yet. Redirecting in 3 seconds.
              </Typography>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, height: 45, backgroundColor: "orangered" }}
          >
            Continue to payment
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CheckoutForm;
