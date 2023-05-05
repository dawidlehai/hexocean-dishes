import { Fragment } from "react";
import type { responseType } from "../App";

interface SubmitResultPageProps {
  responseOk: boolean;
  response: responseType;
}

const SubmitResultPage = ({ responseOk, response }: SubmitResultPageProps) => {
  const refreshPageHandler = () => {
    window.location.reload();
  };

  const details = Object.entries(response).map(([field, value], index, arr) => (
    <Fragment key={field}>
      {value} ({field}){index === arr.length - 1 ? "." : "; "}
    </Fragment>
  ));

  return (
    <>
      {responseOk && <p>Your dish was sent successfully!</p>}
      {!responseOk && (
        <>
          <p className="error">There was a problem with the request.</p>
          <p>Details: {details}</p>
        </>
      )}

      <button onClick={refreshPageHandler}>
        {responseOk && "Add another one"}
        {!responseOk && "Try again"}
      </button>
    </>
  );
};

export default SubmitResultPage;
