import DeliveryOption from "./DeliveryOption";
import {
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface DeliveryProps {
  deliveryMethod: number;
  setDeliveryMethod: React.Dispatch<React.SetStateAction<number>>;
}

function DeliveryPicker({ deliveryMethod, setDeliveryMethod }: DeliveryProps) {
  return (
    <FormControl>
      <RadioGroup
        name="delivery-radio-buttons"
        aria-labelledby="delivery-radio-buttons"
        value={deliveryMethod}
        onChange={(event) => setDeliveryMethod(+event?.target.value)}
        sx={{ rowGap: 2 }}
      >
        <FormControlLabel
          defaultChecked
          value={0}
          control={<Radio />}
          label={<DeliveryOption name="DHL Home" />}
        />
        <Divider />
        <FormControlLabel
          value={1}
          control={<Radio />}
          label={<DeliveryOption name="DPD Home" />}
        />
        <Divider />
        <FormControlLabel
          value={2}
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
