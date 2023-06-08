import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface CardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  onSale: boolean;
  img: string;
}

function ProductCard({
  id,
  title,
  category,
  description,
  price,
  onSale,
  img,
}: CardProps) {
  const saleAmount = +(price * 0.3).toFixed(2);
  const onSalePrice = onSale ? (price - saleAmount).toFixed(2) : price;

  return (
    <Card sx={{ maxWidth: 270 }}>
      <CardMedia
        component="img"
        image={img}
        title={title}
        sx={{ height: 200, objectFit: "contain" }}
      />
      <CardContent sx={{ height: 95 }}>
        <Typography variant="caption" fontWeight={700}>
          {category}
        </Typography>
        <Typography gutterBottom variant="subtitle1" component="div">
          {title}
        </Typography>

        {/* {onSale && (
          <Typography variant="subtitle1" color="orangered">
            On sale!
          </Typography>
        )} */}
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

        {/* <Typography variant="body2" color="text.secondary">
          {description}
        </Typography> */}
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
