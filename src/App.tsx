import { useEffect, useState } from "react";
import DishForm from "./components/DishForm";
import "./App.css";
import type { DishFormValues } from "./components/DishForm";

function App() {
  const [response, setResponse] = useState();
  const [responseOk, setResponseOk] = useState(true);

  const sendDataHandler = async (data: DishFormValues) => {
    // data = {
    //   name: "HexOcean pizza",
    //   preparation_time: "01:30:22",
    //   type: "pizza",
    //   no_of_slices: 4,
    //   diameter: 0,
    // };

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const apiResponse = await fetch(
        "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
        options
      );

      if (!apiResponse.ok) setResponseOk(false);

      setResponse(await apiResponse.json());
    } catch (error) {
      const message = {
        error: error.message ?? "Something went really wrong!",
      };

      setResponseOk(false);
      setResponse(message);
    }
  };

  const refreshPageHandler = () => window.location.reload();

  return (
    <>
      <h1>HexOcean Dishes</h1>
      {!response && <DishForm onSubmit={sendDataHandler} />}
      {response && responseOk && <p>Your dish was sent successfully!</p>}
      {response && !responseOk && (
        <>
          <p>There was a problem sending the data.</p>
          <p>
            Details:{" "}
            {Object.entries(response).map(([field, value], index, arr) => (
              <>
                {value} ({field}){index === arr.length - 1 ? "." : "; "}
              </>
            ))}
          </p>
        </>
      )}
      {response && (
        <button onClick={refreshPageHandler}>
          {responseOk && "Send another dish"}
          {!responseOk && "Try again"}
        </button>
      )}
    </>
  );
}

export default App;
