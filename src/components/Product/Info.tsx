import { useDispatch } from "react-redux";
import { productsActions } from "../../store/products-slice";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";

// interface InfoProps {
//   title: string | undefined;
//   description: string | undefined;
//   price: number | undefined;
//   category: string | undefined;
// }

interface ProductData {
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  new: boolean;
  onSale: boolean;
  price: number;
  thumbnail: string;
  title: string;
}

interface Product {
  id: string;
  data: ProductData;
}

function Info({ product }: { product: Product }) {
  const { category, title, description, price } = product.data;
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(productsActions.addProduct(product));
  };

  return (
    <Stack direction="column">
      <Typography variant="subtitle1">{category}</Typography>
      <Divider />
      <Box mt={2}>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="subtitle1" mt={2}>
          {description}
        </Typography>
        <Typography variant="h5" mt={2}>
          ${price}
        </Typography>
      </Box>
      <Button
        variant="contained"
        sx={{ marginTop: 3 }}
        onClick={addToCartHandler}
      >
        Purchase
      </Button>
    </Stack>
  );
}

export default Info;
