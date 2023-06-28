import { Link, LinkProps } from "react-router-dom";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Fade,
  styled,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface Product {
  category: string;
  description: string;
  image: string;
  new: boolean;
  onSale: boolean;
  price: number;
  thumbnail: string;
  title: string;
}

interface CardProps {
  id: string;
  data: Product;
}

const NewIcon = styled(FiberNewIcon)({
  position: "absolute",
  top: 5,
  right: 5,
  fontSize: 35,
  color: "orangered",
  transform: "rotate(15deg)",
});

const WishlistIcon = styled(FavoriteIcon)({
  position: "absolute",
  top: 5,
  left: 5,
  fontSize: 25,
  color: "lightgrey",
  "&:hover": {
    cursor: "pointer",
    color: "red",
  },
});

function ProductCard({ id, data }: CardProps) {
  const { price, onSale, new: isNew, title, category, image } = data;
  const saleAmount = +(price * 0.3).toFixed(2);
  const onSalePrice = onSale ? (price - saleAmount).toFixed(2) : price;
  const urlString = `/${category.toLowerCase()}/${title
    .toLowerCase()
    .replaceAll(" ", "-")}`;

  return (
    // <Fade in={true} timeout={500}>
    <Link
      to={urlString}
      state={{ productData: data }}
      style={{ textDecoration: "none" }}
    >
      <Card
        sx={{
          position: "relative",
          maxWidth: 320,
          minWidth: 270,
        }}
      >
        <CardMedia
          component="img"
          /* loading="lazy" */
          image={image}
          title={title}
          sx={{ height: 200, objectFit: "contain" }}
        />
        <WishlistIcon />
        {isNew && <NewIcon />}
        <CardContent sx={{ height: 130 }}>
          <Typography variant="caption" fontWeight={700}>
            {category}
          </Typography>
          <Typography variant="subtitle1" component="div" minHeight={55}>
            {title}
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={1}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="h6" color={onSale ? "orangered" : "primary"}>
                {onSale ? onSalePrice : price} €
              </Typography>
              {onSale && (
                <Typography variant="body2" color="primary.light">
                  <s>({price})</s> €
                </Typography>
              )}
            </Box>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              <CheckCircleOutlineIcon
                style={{ fontSize: 20, color: "GrayText" }}
              />
              <Typography variant="caption" ml={0.4} color="GrayText">
                In stock
              </Typography>
            </Box>
          </Box>
        </CardContent>
        <CardActions>
          {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
        </CardActions>
      </Card>
    </Link>
    // </Fade>
  );
}

export default ProductCard;
