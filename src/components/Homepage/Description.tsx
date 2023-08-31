import { Box, Container, Typography } from "@mui/material";

const boxStyle = {
  marginBottom: 6,
  marginTop: 6,
  padding: "40px 0",
  backgroundColor: "#f4f5f7",
  border: "1px lightgrey solid",
};

function NextGenDescription() {
  return (
    <Box sx={boxStyle}>
      <Container maxWidth="md" sx={{ mb: 3 }}>
        <Typography variant="h3" fontWeight={700} textAlign="center" mb={2}>
          Who are we?
        </Typography>
        <Typography
          textAlign="center"
          mb={4}
          sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
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
        <Typography
          textAlign="center"
          sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
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
