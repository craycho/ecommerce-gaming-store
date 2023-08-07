import { Box } from "@mui/material";

function MainImage({ mainImage }: { mainImage: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        component="img"
        src={mainImage}
        width="100%"
        height={450}
        sx={{ objectFit: "contain" }}
      />
    </Box>
  );
}

export default MainImage;
