import { Box, Button, Divider, Stack, Typography } from "@mui/material";

interface InfoProps {
  title: string;
  description: string;
  price: number;
  category: string;
}

function Info({ title, description, price, category }: InfoProps) {
  return (
    <Stack direction="column">
      <Typography variant="subtitle1">{category}</Typography>
      <Divider />
      <Box mt={2}>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="subtitle1" mt={2}>
          {description}
        </Typography>
        <Typography variant="h5" mt={2}>
          ${price}
        </Typography>
      </Box>
      <Button variant="contained" sx={{ marginTop: 3 }}>
        Purchase
      </Button>
    </Stack>
  );
}

export default Info;
