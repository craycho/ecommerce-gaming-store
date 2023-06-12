import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface CardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  isNew: boolean;
  onSale: boolean;
  img: string;
}

const NewIcon = styled(FiberNewIcon)({
  position: "absolute",
  top: 5,
  right: 5,
  fontSize: 35,
  color: "orangered",
  transform: "rotate(20deg)",
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

function ProductCard({
  id,
  title,
  category,
  description,
  price,
  isNew,
  onSale,
  img,
}: CardProps) {
  const saleAmount = +(price * 0.3).toFixed(2);
  const onSalePrice = onSale ? (price - saleAmount).toFixed(2) : price;

  return (
    <Card sx={{ position: "relative", maxWidth: 320 }}>
      <CardMedia
        component="img"
        image={img}
        title={title}
        sx={{ height: 200, objectFit: "contain" }}
      />
      <WishlistIcon />
      {isNew && <NewIcon />}
      <CardContent sx={{ height: 130 }}>
        <Typography variant="caption" fontWeight={700}>
          {category}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="div">
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
              <Typography variant="body1" color="primary.light">
                <s>({price})</s> €
              </Typography>
            )}
          </Box>
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <CheckCircleOutlineIcon />
            <Typography variant="caption" ml={0.4}>
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
  );
}

export default ProductCard;
