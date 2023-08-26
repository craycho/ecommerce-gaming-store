import { Link, useNavigate } from "react-router-dom";

import { Box, Button, Stack, styled, Typography } from "@mui/material";
import razerHuntsmanBanner from "../../assets/razer-huntsman-elite-banner.jpg";
import corsairScimitarBanner from "../../assets/corsair-scimitar-banner-flipped.jpg";
import nextgenLogoWhite from "../../assets/nextgen-logo-white.png";

const bannerImageStyle = {
  height: { sm: 275, xs: 220 },
  width: { xs: "100%", sm: "85%" },
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  borderRadius: 1,
  transition: "all 0.1s ease",

  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.005)",
    transitionDuration: "0.1s",
  },
};

const logoStyles = {
  position: "absolute",
  top: 25,
  right: { sm: 33, xs: 20 },
  height: { sm: 90, xs: 50 },
};

const textStyle = {
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

const BuyButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: 35,
  backgroundColor: "orangered",
  "&:hover": {
    backgroundColor: "#d03c06",
  },

  [theme.breakpoints.down("sm")]: {
    width: 110,
    height: 40,
    bottom: 25,
    fontSize: 13,
  },
}));

function BannerStack() {
  const navigate = useNavigate();

  return (
    <Stack direction="column" spacing={1.5} alignItems="center" mb={5} mt={5}>
      <Box
        position="relative"
        onClick={() =>
          navigate("/keyboards/razer-huntsman-elite-mechanical-gaming-keyboard")
        }
        sx={{
          ...bannerImageStyle,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.55)), url('${razerHuntsmanBanner}')`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 20,
            left: { sm: 30, xs: 20 },
            width: { xs: "70%", sm: "25%" },
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            color="#f4f4f4"
            mb={1}
            mt={0.5}
          >
            Razer Huntsman Elite
          </Typography>
          <Typography variant="subtitle1" color="#f4f4f4" sx={textStyle}>
            30% off for a limited time only!
          </Typography>
        </Box>
        <Link to={"/keyboards/razer-huntsman-elite-mechanical-gaming-keyboard"}>
          <BuyButton
            variant="contained"
            size="large"
            sx={{ right: { sm: 30, xs: 25 } }}
          >
            Buy now
          </BuyButton>
        </Link>
      </Box>

      <Box
        position="relative"
        onClick={() =>
          navigate("/mice/corsair-scimitar-rgb-elite-gaming-mouse")
        }
        sx={{
          ...bannerImageStyle,
          width: { xs: "100%", sm: "85%" },
          height: { sm: 335, xs: 260 },
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.55)), url('${corsairScimitarBanner}')`,
          backgroundPosition: "center 38%",
        }}
      >
        <Box
          component="img"
          alt="Next Gen logo"
          src={nextgenLogoWhite}
          sx={logoStyles}
        />
        <Box
          sx={{
            position: "absolute",
            right: { sm: 30, xs: 20 },
            bottom: { sm: 30, xs: 20 },
            width: { xs: "50%", sm: "25%" },
          }}
        >
          <Typography
            variant="subtitle1"
            color="#f4f4f4"
            textAlign="right"
            sx={textStyle}
            mb={1}
          >
            Only a few left in stock!
          </Typography>
          <Typography
            variant="h4"
            fontWeight={700}
            color="#f4f4f4"
            textAlign="right"
          >
            Corsair Scimitar RGB Elite
          </Typography>
        </Box>
        <Link to={"/mice/corsair-scimitar-rgb-elite-gaming-mouse"}>
          <BuyButton
            variant="contained"
            size="large"
            sx={{ left: { sm: 30, xs: 25 } }}
          >
            Buy now
          </BuyButton>
        </Link>
      </Box>
    </Stack>
  );
}

export default BannerStack;
