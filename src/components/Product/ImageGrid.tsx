import { Container, Stack } from "@mui/material";

interface GridProps {
  images: string[];
  selectedImage: number;
  onSelect: React.Dispatch<React.SetStateAction<number>>;
}

function ImageGrid({ images, selectedImage, onSelect }: GridProps) {
  return (
    <Stack sx={{ flexDirection: { xs: "row", md: "column" } }}>
      {images.map((image, index) => (
        <img
          key={image}
          src={image}
          height={100}
          width={100}
          style={{
            border:
              index === selectedImage
                ? "solid 2px orangered"
                : "solid 1px lightgrey",
            borderRadius: "1px",
            cursor: "pointer",
            objectFit: "cover",
          }}
          onClick={() => onSelect(index)}
        />
      ))}
    </Stack>
  );
}

export default ImageGrid;
