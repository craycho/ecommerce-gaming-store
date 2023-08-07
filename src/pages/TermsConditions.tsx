import { useEffect } from "react";
import { Container, styled, Typography } from "@mui/material";

const Headline = styled(Typography)({
  fontSize: 18,
  fontWeight: 700,
  marginBottom: 5,
});

const BodyText = styled(Typography)({
  marginBottom: 25,
});

function TermsConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container sx={{ mt: 5, mb: 7, width: "60%" }}>
      <Typography variant="h5" fontWeight={700} mb={2}>
        Terms & Conditions
      </Typography>
      <Typography variant="body1" fontWeight={700} mb={4}>
        By placing an order, you agree to the following terms and conditions set
        forth by Nextgen Gaming (NG) for the purchase of gaming gear from our
        ecommerce website.
      </Typography>
      <Headline>1. Ordering and Eligibility</Headline>
      <BodyText>
        All orders must be placed online through our website, as we do not have
        a physical store. Customers under the age of 18 must have permission
        from their legal guardian before making a purchase. Minors who place
        orders without proper consent are financially responsible for Nextgen
        Gaming's costs, and their legal guardians have the ultimate
        responsibility. Placing orders in another person's name without their
        consent will be reported. Prices in the web store and any offers are
        valid as long as items are in stock and until further notice. We reserve
        the right to correct errors or mistakes.
      </BodyText>
      <Headline>2. Cancellations</Headline>
      <BodyText>
        Customers can cancel an order before it has been packed/shipped by
        Nextgen Gaming. Once an order has been sent for packaging, it cannot be
        canceled, and the customer may need to return the order according to our
        return policy.
      </BodyText>
      <Headline>3. Price Changes</Headline>
      <BodyText>
        We reserve the right to change prices without prior notification,
        especially in the case of major changes in exchange rates. Confirmed
        orders for stocked products will be delivered at the confirmed price,
        even if prices change before delivery.
      </BodyText>
      <Headline>4. Delivery</Headline>
      <BodyText>
        Confirmed orders for in-stock items made before 3 p.m. are usually
        expedited the same day on weekdays. Larger orders and orders with
        express delivery may have longer delivery times. Shipping does not
        guarantee a specific delivery time. In the case of delayed delivery, the
        customer has the right to cancel the purchase and return the order
        within 60 days.
      </BodyText>
      <Headline>5. Shipping</Headline>
      <BodyText>
        Deliveries for private individuals will be done through Global mail/DPD
        or DHL Home & Express, depending on weight and size. Unclaimed or
        incorrectly addressed consignments will incur a service fee for shipping
        and administration costs.
      </BodyText>
      <Headline>6. Transportation Damages</Headline>
      <BodyText>
        Customers should check deliveries upon receipt and immediately report
        any damages caused during transportation to the logistics partner and
        Nextgen Gaming.
      </BodyText>
      <Headline>7. Support</Headline>
      <BodyText>
        For any problems or issues with products, customers can reach our
        support service via email at <strong> info@nextgengaming.com</strong>,
        providing the order ID and details of the issue.
      </BodyText>
      <Headline>8. Complaints</Headline>
      <BodyText>
        Customers with product issues should report them via email at
        <strong> info@nextgengaming.com</strong>, providing a detailed error
        description. Certain conditions may invalidate warranties and
        complaints, such as faulty handling/usage or insufficient error
        descriptions.
      </BodyText>
      <Headline>9. Returns</Headline>
      <BodyText>
        Customers must contact customer service via email (
        <strong>info@nextgengaming.com</strong>) before returning any items.
        Open Purchase period of 30 days is valid for private customers. Certain
        products are excluded from the Open Purchase policy. Customers are
        responsible for the shipping fees for returns, and the product must be
        in its original condition.
      </BodyText>
      <Headline>10. Warranty</Headline>
      <BodyText>
        Manufacturer's warranty conditions apply. Nextgen Gaming (NG) provides a
        one-year warranty, but longer warranties from the manufacturer may
        apply. Warranties do not cover mishandling, accidents, wear and tear, or
        modifications made by the customer.
      </BodyText>
      <Headline>11. Other Conditions</Headline>
      <BodyText>
        For additional information about purchases, customers can contact
        <strong> info@nextgengaming.com</strong>. Nextgen Gaming reserves the
        right to update or change these terms over time. For any further
        questions or concerns, feel free to reach out to our customer service at
        info@nextgengaming.com. Thank you for choosing Nextgen gaming! Happy
        gaming! Please note that the generated terms and conditions have been
        condensed to half the size as requested, but it is essential to ensure
        that all necessary legal aspects are addressed properly. It's always
        recommended to consult with a legal professional to ensure compliance
        with relevant laws and regulations for your specific business context.
      </BodyText>
    </Container>
  );
}

export default TermsConditions;
