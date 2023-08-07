import { useEffect } from "react";
import { Container, styled, Typography } from "@mui/material";

const Headline = styled(Typography)({
  fontSize: 18,
  fontWeight: 700,
  marginBottom: 5,
});

const BodyText = styled(Typography)({
  fontSize: 15,
  marginBottom: 25,
});

function CustomerService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container sx={{ mt: 5, mb: 7, width: "60%" }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Feel free to reach out to us!
      </Typography>
      <BodyText>
        At NextGen Gaming, we pride ourselves on having exceptional customers
        like you, and we're dedicated to delivering the best customer support in
        the industry. Our customer service is renowned for its professionalism
        and welcoming approach, and we hold ourselves to the highest standards.
        When it comes to support, we don't settle for anything less than
        excellence. Whether you need assistance with technical issues,
        pre-orders, stock inquiries, or purchasing advice, we're here to help.
        Feel free to reach out to us via email or telephone. We provide these
        contact options so you can receive the best possible assistance in the
        way that suits your preferences.
      </BodyText>
      <Headline>General Inquiries and Orders</Headline>
      <BodyText>
        For any questions about our products or general inquiries, don't
        hesitate to contact us at <strong> info@nextgengaming.com</strong>.
        We're here to assist you with changing items, cancellations, or any
        other queries you might have. Simply drop us an email, and we'll guide
        you through the process in the most efficient way possible. If you have
        questions about your order, kindly include your order-ID or customer
        registration number so we can quickly locate your order details.
      </BodyText>
      <Headline>Support Services</Headline>
      <BodyText>
        After you've received your order, our support team is here to assist
        you. Whether you need help understanding how a product works or want to
        initiate a return, we've got you covered. If you're planning to return
        an item or file a complaint, please reach out to us first at
        <strong> info@nextgengaming.com</strong>. We'll provide you with clear
        instructions once we receive your case. Be sure to include your order-ID
        in the subject line for efficient communication. At NextGen Gaming,
        we're dedicated to ensuring your satisfaction every step of the way.
        Feel free to get in touch with us whenever you need assistance or have
        questions. Thank you for choosing NextGen Gaming for all your gaming
        needs! Please remember to customize the content as needed and ensure
        that all contact information and terms are accurate and up-to-date.
      </BodyText>
    </Container>
  );
}

export default CustomerService;
