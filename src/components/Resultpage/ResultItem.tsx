import { Box } from "@mui/material";
import { Product } from "../../util/type-definitions";

function ResultItem({ productData }: { productData: Product }) {
  return <Box>{productData.data.title}</Box>;
}

export default ResultItem;
