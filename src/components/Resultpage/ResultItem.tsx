import { Box } from "@mui/material";

interface ProductData {
  category: string;
  description: string;
  image: string;
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

function ResultItem({ productData }: { productData: Product }) {
  return <Box>{productData.data.title}</Box>;
}

export default ResultItem;
