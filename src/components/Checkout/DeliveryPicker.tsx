import { useState } from "react";

import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import DeliveryOption from "./DeliveryOption";

function DeliveryPicker() {
  const [deliveryMethod, setDeliveryMethod] = useState<string>("DHLHome");

  const deliveryMethodHandler = () => {};

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="delivery-radio-buttons"
        name="delivery-radio-buttons"
        value={deliveryMethod}
        onChange={deliveryMethodHandler}
        sx={{
          rowGap: 2,
        }}
      >
        <FormControlLabel
          value="DHL Home"
          defaultChecked
          control={<Radio />}
          label={<DeliveryOption name="DHL Home" />}
        />
        <Divider />
        <FormControlLabel
          value="DPD Home"
          control={<Radio />}
          label={<DeliveryOption name="DPD Home" />}
        />
        <Divider />
        <FormControlLabel
          value="DHL Express"
          control={<Radio />}
          label={<DeliveryOption name="DHL Express" />}
        />
      </RadioGroup>
    </FormControl>
  );
}

export default DeliveryPicker;

/* DHL Home DeliveryFully trackable package with the optional delivery method. Home to the door or to a service point and parcel locker within 3-7 working days.
8.95 €


DPD Home deliveryFully traceable package that is delivered directly to your home within 2-5 working days.
19.99 €


DHL Express DeliveryFully tracked express parcel sent directly to your home or to your nearest service point within 1-3 business days.
99.90 €
 */
