import { Box, Stack, Typography } from "@mui/material";
import { Params, useLoaderData } from "react-router-dom";

interface LoaderData {
  category: string;
  currentInput: string;
}

function ResultsPage() {
  //   const { category, currentInput } = useLoaderData() as LoaderData;

  return (
    <Box sx={{ width: "85%" }} margin="30px auto">
      <Typography variant="h6">{`Showing results for ${"currentInput"} in ${"category"}.`}</Typography>
      <Stack direction="row" gap={1.5} justifyContent="center"></Stack>
    </Box>
  );
}

export default ResultsPage;

interface LoaderData {
  params: Params;
}

export function resultsLoader({ params }: LoaderData) {
  console.log(params);
  return params;
}
