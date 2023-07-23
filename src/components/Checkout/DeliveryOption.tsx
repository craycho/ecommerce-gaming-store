import { Box, Grid, Stack, Typography } from "@mui/material";
import DHLIcon from "../../assets/dhl-icon.png";
import DPDIcon from "../../assets/dpd-icon.png";

const deliveryOptions = [
  {
    name: "DHL Home",
    description:
      "Fully trackable package with the optional delivery method. Home to the door or to a service point and parcel locker within 3-7 working days.",
    image: DHLIcon,
    price: 8.95,
  },
  {
    name: "DPD Home",
    description:
      "Fully traceable package that is delivered directly to your home within 2-5 working days.",
    image: DPDIcon,
    price: 19.99,
  },
  {
    name: "DHL Express",
    description:
      "Fully tracked express parcel sent directly to your home or to your nearest service point within 1-3 business days.",
    image: DHLIcon,
    price: 99.9,
  },
];

function DeliveryOption({ name }: { name: string }) {
  const chosenOption = deliveryOptions.find((option) => option.name === name);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <img
        src={chosenOption?.image}
        width="40"
        height="40"
        style={{ borderRadius: "50%", marginLeft: 2 }}
      />
      <Stack direction="column">
        <Typography variant="subtitle1" fontWeight={700} ml={1.5}>
          {chosenOption?.name}
        </Typography>
        <Typography variant="subtitle2" ml={1.5} width={320}>
          {chosenOption?.description}
        </Typography>
      </Stack>
      <Typography
        variant="h6"
        fontWeight={700}
        whiteSpace="nowrap"
        sx={{ width: 80, display: "flex", justifyContent: "end" }}
      >
        {chosenOption?.price} €
      </Typography>
    </Stack>
  );
}

export default DeliveryOption;

/* <Grid container columnSpacing={7}>
      <Grid item xs={12}>
        <Typography variant="subtitle1" fontWeight={700} ml={7}>
          {chosenOption?.name}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <img
          src={chosenOption?.image}
          width="40"
          style={{ borderRadius: "50%" }}
        />
      </Grid>
      <Grid item xs={10}>
        <Typography variant="subtitle2" color="GrayText">
          {chosenOption?.description}
        </Typography>
      </Grid>
    </Grid> */
