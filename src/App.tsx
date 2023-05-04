import { useState } from "react";
import DishForm from "./components/DishForm";
import "./App.css";
import type { DishFormValues } from "./components/DishForm";

function App() {
  const [response, setResponse] = useState();
  const [responseOk, setResponseOk] = useState(true);

  const sendDataHandler = async (data: DishFormValues) => {
    const dataFiltered: DishFormValues = {
      name: data.name,
      preparation_time: data.preparation_time,
      type: data.type,
    };

    if (data.type === "pizza") {
      dataFiltered.no_of_slices = data.no_of_slices;
      dataFiltered.diameter = data.diameter;
    }
    if (data.type === "soup")
      dataFiltered.spiciness_scale = data.spiciness_scale;
    if (data.type === "sandwich")
      dataFiltered.slices_of_bread = data.slices_of_bread;

    console.log(dataFiltered);

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataFiltered),
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
      <header>
        <h1>HexOcean Dishes</h1>
        <p>Add your favourite dish now!</p>
      </header>
      <main>
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
            {responseOk && "Add another one"}
            {!responseOk && "Try again"}
          </button>
        )}
      </main>
    </>
  );
}

export default App;
