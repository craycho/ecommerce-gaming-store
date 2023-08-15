import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../util/type-definitions";

import CorsairHero from "../../assets/corsair-k95-hero.jpg";
import SteelseriesHero from "../../assets/steelseries-hero.jpg";
import NoblechairsHero from "../../assets/noble-chair-hero.jpg";

import { Box, Button, Fade, Typography } from "@mui/material";

const imageBoxStyle = {
  width: "100%",
  height: 530,
  backgroundSize: "cover",
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  borderRadius: 1,

  "&:hover": {
    cursor: "pointer",
  },
};

interface ProductProps {
  key: string | undefined;
  product: Product | undefined;
  promo: string;
}

function HeroProduct({ product, promo }: ProductProps) {
  const navigate = useNavigate();
  const productTitle = product?.data.title;
  const productUrl = `/${product?.data.category.toLowerCase()}/${product?.data.title
    .toLowerCase()
    .replaceAll(" ", "-")}`;
  const heroImage = productTitle?.includes("Steelseries Arctis") ? (
    SteelseriesHero
  ) : productTitle?.includes("Noblechairs Hero") ? (
    NoblechairsHero
  ) : productTitle?.includes("Corsair K95") ? (
    CorsairHero
  ) : (
    <h4>Error displaying image.</h4>
  );

  return (
    <Fade in={true} timeout={700}>
      <Box
        position="relative"
        sx={{
          ...imageBoxStyle,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.55)), url('${heroImage}')`,
        }}
        onClick={() => navigate(productUrl)}
      >
        <Box
          style={{
            position: "absolute",
            bottom: 30,
            marginLeft: 25,
            marginRight: 25,
            width: "90%",
          }}
        >
          {promo && (
            <Typography variant="h4" fontWeight={700} color="white" mb={1}>
              {promo}
            </Typography>
          )}
          <Typography
            gutterBottom
            variant="subtitle1"
            fontWeight={700}
            color="white"
            sx={{
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {product?.data.title}
          </Typography>
          <Link to={productUrl}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "orangered",
                marginTop: 1,
                padding: "8px 18px",
                "&:hover": {
                  backgroundColor: "#d03c06",
                },
              }}
            >
              Buy now
            </Button>
          </Link>
        </Box>
      </Box>
    </Fade>
  );
}

export default HeroProduct;
