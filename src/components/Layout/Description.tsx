import { Box, Container, Typography } from "@mui/material";

const boxStyle = {
  backgroundColor: "#f4f5f7",
  padding: "40px 0",
  border: "1px lightgrey solid",
  marginBottom: 6,
  marginTop: 6,
};

function NextGenDescription() {
  return (
    <Box sx={boxStyle}>
      <Container maxWidth="md" sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={700} textAlign="center" mb={2}>
          Who are we?
        </Typography>
        <Typography variant="body1" textAlign="center" mb={4}>
          Welcome to <strong>NextGen Gaming</strong>, the ultimate destination
          for gamers seeking an unparalleled experience. We offer an extensive
          collection of cutting-edge gaming products and accessories for both
          casual enthusiasts and hardcore gamers. Explore our virtual shelves,
          stocked with the latest and greatest gaming keyboards, mice, monitors
          and more!
        </Typography>
        <Typography variant="h5" fontWeight={700} textAlign="center" mb={2}>
          Looking for tips or need some help?
        </Typography>
        <Typography variant="body1" textAlign="center">
          Our dedicated team of gaming enthusiasts provide exceptional customer
          service, offer expert advice and keep you up to date with the latest
          industry trends. NextGen Gaming is where your gaming journey begins,
          with limitless possibilities and the future of gaming at your
          fingertips. Get ready to level up and embrace the NextGen gaming
          revolution.
        </Typography>
      </Container>
    </Box>
  );
}

export default NextGenDescription;
