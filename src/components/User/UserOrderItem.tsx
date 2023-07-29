import { useState } from "react";

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { generateRandomNumber } from "../../util/random-number";

const ItemBox = styled(Box)({
  width: 100,
  height: 80,
  overflowX: "hidden",
  overflowY: "hidden",

  "&:hover": {
    cursor: "pointer",
  },
});

const OrderInfo = styled(Typography)({
  fontSize: 12,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
});

const OrderDialogBox = styled(Dialog)({});

interface OrderItemProps {
  userOrder: string[];
  index: number;
  keyId: string;
}

function UserOrderItem({ userOrder, index, keyId }: OrderItemProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <>
      <ItemBox
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        <Typography variant="subtitle2" fontWeight={700} mb={0.7}>
          Order #{index + 1}
        </Typography>
        <Stack direction="column">
          {userOrder.map((order) => (
            <OrderInfo variant="body1" key={keyId + generateRandomNumber()}>
              {order}
            </OrderInfo>
          ))}
        </Stack>
      </ItemBox>
      <OrderDialogBox open={dialogOpen} onClose={() => setDialogOpen(false)}>
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
                <strong>Placed on:</strong> 29.07.2023.
              </Typography>
              <Typography variant="body2" fontSize={13} textAlign="right">
                <strong>Expected arrival:</strong> 12.08.2023.
              </Typography>
            </Stack>
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Stack direction="column" spacing={2}>
            {userOrder.map((order) => (
              <Typography variant="body1">{order}</Typography>
            ))}
          </Stack>
        </DialogContent>
      </OrderDialogBox>
    </>
  );
}

export default UserOrderItem;

/* <Stack direction="column" spacing={1}>
        {userOrder.map((order) => order)}
      </Stack> */

/* <Typography variant="subtitle2" fontWeight={700} mb={0.7}>
          Order #{index + 1}
        </Typography>
        <Stack direction="column">
          {userOrder.map((order) => (
            <Typography key={keyId + generateRandomNumber()}>
              {order}
            </Typography>
          ))}
          /
        </Stack> */
