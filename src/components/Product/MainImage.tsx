import { Box } from "@mui/material";

function MainImage({ mainImage }: { mainImage: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: 400,
      }}
    >
      <img src={mainImage} width="100%" />
    </Box>
  );
}

export default MainImage;
