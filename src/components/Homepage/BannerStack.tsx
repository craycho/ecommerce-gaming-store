import { Link, useNavigate } from "react-router-dom";

import { Box, Button, Stack, styled, Typography } from "@mui/material";
import razerHuntsmanBanner from "../../assets/razer-huntsman-elite-banner.jpg";
import corsairScimitarBanner from "../../assets/corsair-scimitar-banner-flipped.jpg";
import nextgenLogoWhite from "../../assets/nextgen-logo-white.png";

const bannerImageStyle = {
  width: "85%",
  height: 275,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  borderRadius: 1,
  transition: "all 0.1s ease",

  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.005)",
    transitionDuration: "0.1s",
  },
};

const textBoxStyle = {
  position: "absolute",
  top: 20,
  left: 25,
  width: "25%",
};

const textStyle = {
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

function BannerStack() {
  const navigate = useNavigate();

  return (
    <Stack direction="column" spacing={2} alignItems="center" mb={6} mt={5}>
      <Box
        position="relative"
        onClick={() =>
          navigate("/keyboards/razer-huntsman-elite-mechanical-gaming-keyboard")
        }
        sx={{
          ...bannerImageStyle,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.55)), url('${razerHuntsmanBanner}')`,
          backgroundPosition: "center center",
        }}
      >
        {/* <Box
          component="img"
          alt="Next Gen logo"
          src={nextgenLogoWhite}
          sx={{ position: "absolute", bottom: 25, left: 33, height: 60 }}
        /> */}
        <Box sx={textBoxStyle}>
          <Typography
            variant="h4"
            fontWeight={700}
            color="whitesmoke"
            mb={1}
            mt={0.5}
          >
            Razer Huntsman Elite
          </Typography>
          <Typography variant="subtitle1" color="white" sx={textStyle}>
            30% off for a limited time only!
          </Typography>
        </Box>
        <Link to={"/keyboards/razer-huntsman-elite-mechanical-gaming-keyboard"}>
          <Button
            variant="contained"
            size="large"
            sx={{
              position: "absolute",
              right: 30,
              bottom: 25,
              backgroundColor: "orangered",
              width: 140,
              "&:hover": {
                backgroundColor: "#d03c06",
              },
            }}
          >
            Buy now
          </Button>
        </Link>
      </Box>

      <Box
        position="relative"
        onClick={() =>
          navigate("/mice/corsair-scimitar-rgb-elite-gaming-mouse")
        }
        sx={{
          ...bannerImageStyle,
          height: 335,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.55)), url('${corsairScimitarBanner}')`,
          backgroundPosition: "center 38%",
        }}
      >
        <Box
          component="img"
          alt="Next Gen logo"
          src={nextgenLogoWhite}
          sx={{ position: "absolute", top: 25, right: 33, height: 90 }}
        />
        <Box sx={{ position: "absolute", bottom: 25, right: 35, width: "35%" }}>
          <Typography
            variant="subtitle1"
            color="white"
            textAlign="right"
            sx={textStyle}
            mb={1}
          >
            Only a few left in stock!
          </Typography>
          <Typography
            variant="h4"
            fontWeight={700}
            color="whitesmoke"
            textAlign="right"
            mb={1}
          >
            Corsair Scimitar RGB Elite
          </Typography>
        </Box>
        <Link to={"/mice/corsair-scimitar-rgb-elite-gaming-mouse"}>
          <Button
            variant="contained"
            size="large"
            sx={{
              position: "absolute",
              left: 35,
              bottom: 25,
              backgroundColor: "orangered",
              width: 140,
              "&:hover": {
                backgroundColor: "#d03c06",
              },
            }}
          >
            Buy now
          </Button>
        </Link>
      </Box>
    </Stack>
  );
}

export default BannerStack;

/* <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "orangered",
                  marginTop: 1,
                  padding: "8px 18px",
                }}
              >
                Buy now
              </Button> */
