import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../store/index";
import { wishlistActions } from "../store/wishlist-slice";
import WishlistItem from "../components/Wishlistpage/WishlistItem";

import {
  Button,
  Container,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";

function Faq() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container
      sx={{
        mt: 5,
        mb: 7,
        width: "60%",
      }}
    >
      <Typography variant="h4" fontWeight={700} mb={3}>
        Frequently asked questions (FAQ)
      </Typography>
      <Typography variant="body1" fontWeight={700} mb={0.5}>
        Q: What payment methods do you accept?
      </Typography>
      <Typography variant="body1" mb={3}>
        A: We accept various payment methods, including credit/debit cards
        (Visa, Mastercard Express), PayPal, and Stripe. All transactions are
        securely processed to ensure your financial information remains safe.
      </Typography>
      <Typography variant="body1" fontWeight={700} mb={0.5}>
        Q: How long does shipping take?
      </Typography>
      <Typography variant="body1" mb={3}>
        A: Shipping times may vary depending on your location and the shipping
        method selected. Generally, orders within the European Union take 1-3
        business days to arrive, while international orders may take 5-7
        business days. Any order you place will appear in your profile under
        your current orders so you can monitor its status.
      </Typography>
      <Typography variant="body1" fontWeight={700} mb={0.5}>
        Q: Do you offer international shipping?
      </Typography>
      <Typography variant="body1" mb={3}>
        A: Yes, we provide international shipping to most countries worldwide.
        Please note that customs duties and taxes may apply to international
        orders, and the customer is responsible for covering these additional
        fees.
      </Typography>
      <Typography variant="body1" fontWeight={700} mb={0.5}>
        Q: What is your return policy?
      </Typography>
      <Typography variant="body1" mb={3}>
        A: We want you to be completely satisfied with your purchase. If for any
        reason you are not happy with your gaming gear, you may return it within
        30 days of receiving the order. The items should be unused and in their
        original packaging. Please contact our customer support at
        <strong> info@nextgengaming.com</strong> to initiate the return process.
      </Typography>
      <Typography variant="body1" fontWeight={700} mb={0.5}>
        Q: How can I track my order?
      </Typography>
      <Typography variant="body1" mb={4}>
        A: Once your order is processed and shipped, you will receive a shipping
        confirmation email containing a tracking number and a link to track your
        package's journey. If you encounter any issues or have questions about
        your order's status, feel free to contact our customer support at
        <strong> info@nextgengaming.com</strong>, and we'll be glad to assist
        you.
      </Typography>

      <Typography variant="body2">
        For any other inquiries or concerns, please don't hesitate to reach out
        to us at <strong> info@nextgengaming.com</strong>. Our dedicated support
        team is ready to help you with any questions you may have!
      </Typography>
    </Container>
  );
}

export default Faq;
