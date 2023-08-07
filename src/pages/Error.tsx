import { useRouteError, isRouteErrorResponse } from "react-router-dom";

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
    return <div>An unknown error occured.</div>;
  }
}

export default ErrorPage;
