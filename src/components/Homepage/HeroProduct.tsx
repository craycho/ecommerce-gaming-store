import { Link, useNavigate } from "react-router-dom";
import { Product } from "../../util/type-definitions";

import CorsairHero from "../../assets/corsair-k95-hero.jpg";
import SteelseriesHero from "../../assets/steelseries-hero.jpg";
import NoblechairsHero from "../../assets/noble-chair-hero.jpg";

import { Box, Button, Fade, Typography, styled } from "@mui/material";

const imageBoxStyle = {
  width: "100%",
  height: 530,
  backgroundSize: "cover",
  backgroundPosition: { sm: "center center", xs: "center 20%" },
  backgroundRepeat: "no-repeat",
  borderRadius: { xs: 0, sm: 1 },

  "&:hover": {
    cursor: "pointer",
  },
};

const ContentBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 30,
  marginLeft: 25,
  marginRight: 25,
  width: "90%",

  [theme.breakpoints.down("sm")]: {
    bottom: 50,
    left: 5,
  },
}));

const ProductPromo = styled(Typography)({
  marginBottom: "0.5rem",
  fontSize: "2.1rem",
  fontWeight: 700,
  color: "#F4F4F6",
});

const ProductTitle = styled(Typography)(({ theme }) => ({
  marginBottom: "1.2rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "#F4F4F6",
  fontWeight: 700,

  [theme.breakpoints.down("sm")]: {
    marginBottom: "2rem",
    whiteSpace: "wrap",
  },
}));

const BuyButton = styled(Button)({
  backgroundColor: "orangered",
  padding: "8px 18px",
  "&:hover": {
    backgroundColor: "#d03c06",
  },
});

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
        <ContentBox>
          {promo && <ProductPromo>{promo}</ProductPromo>}
          <ProductTitle>{product?.data.title}</ProductTitle>
          <Link to={productUrl}>
            <BuyButton variant="contained" size="large">
              Buy now
            </BuyButton>
          </Link>
        </ContentBox>
      </Box>
    </Fade>
  );
}

export default HeroProduct;
