import { useState } from "react";
import { generateRandomNumber } from "../../util/random-number";
import { generateDate } from "../../util/generate-date";
import { Product } from "../../util/type-definitions";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";

const ItemBox = styled(Box)({
  width: 100,
  height: 85,
  overflowX: "hidden",
  overflowY: "hidden",
  "&:hover": {
    cursor: "pointer",
  },
});

const OrderInfo = styled(Typography)({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontSize: 12,
});

interface OrderItemProps {
  keyId: string;
  index: number;
  userOrder: Product[];
  orderDate: string;
  deliveryMethod: number;
}

function UserOrderItem({
  keyId,
  index,
  userOrder,
  orderDate,
  deliveryMethod,
}: OrderItemProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const deliveryDate = generateDate(deliveryMethod);

  return (
    <Paper elevation={3} sx={{ p: 1 }}>
      <ItemBox onClick={() => setDialogOpen(true)}>
        <Typography variant="subtitle2" fontWeight={700} mb={0.7}>
          Order #{index + 1}
        </Typography>
        <Stack direction="column">
          {userOrder.map((order) => (
            <OrderInfo variant="body1" key={keyId + generateRandomNumber()}>
              x{order.quantity || "1"} {order.data.title}
            </OrderInfo>
          ))}
        </Stack>
      </ItemBox>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle fontWeight={700}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1" fontWeight={700}>
              Order #{index + 1}
            </Typography>
            <Stack direction="column">
              <Typography variant="body2" fontSize={13} textAlign="right">
                <strong>Placed on:</strong> {orderDate}
              </Typography>
              <Typography variant="body2" fontSize={13} textAlign="right">
                <strong>Expected arrival:</strong> {deliveryDate}
              </Typography>
            </Stack>
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Stack direction="column" spacing={2}>
            {userOrder.map((order) => (
              <Typography variant="body1" key={keyId + generateRandomNumber()}>
                <strong>x{order.quantity || "1"}</strong> {order.data.title}
              </Typography>
            ))}
          </Stack>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}

export default UserOrderItem;
