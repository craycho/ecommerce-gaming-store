import { Container, Typography } from "@mui/material";

function NextGenDescription() {
  return (
    <Container maxWidth="md" sx={{ marginBottom: 8 }}>
      <Typography variant="h4" fontWeight={700} textAlign="center" mb={2}>
        Who are we?
      </Typography>
      <Typography variant="body1" textAlign="center" mb={4}>
        Welcome to <strong>NextGen Gaming</strong>, the ultimate destination for
        gamers seeking an unparalleled experience. We offer an extensive
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
  );
}

export default NextGenDescription;
