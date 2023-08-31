import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import { Container, Typography } from "@mui/material";

function ErrorPage() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h2>Something went wrong!</h2>
        <h3>{error.status}</h3>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </>
    );
  } else {
    return (
      <Container>
        <Typography variant="h6" mt={3}>
          An unknown error occured. Try refreshing the page or entering a
          different URL.
        </Typography>
      </Container>
    );
  }
}

export default ErrorPage;
