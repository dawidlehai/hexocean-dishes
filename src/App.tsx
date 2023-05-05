import { useState, Fragment } from "react";
import { FormSubmitHandler } from "redux-form";
import DishForm from "./components/DishForm";
import "./App.css";
import type { DishFormValues } from "./components/DishForm";

interface responseType {
  error?: string;
  data?: DishFormValues;
}

function App() {
  const [response, setResponse] = useState<responseType | undefined>();
  const [responseOk, setResponseOk] = useState(true);

  const sendDataHandler: FormSubmitHandler<object> = async (
    formData: object
  ) => {
    const data = formData as DishFormValues;

    // TODO

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

    // TODO

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

      const resolvedResponse = await apiResponse.json();
      setResponse(resolvedResponse);
    } catch (error: any) {
      const message = {
        error: error.message ?? "Something went really wrong!",
      };

      setResponseOk(false);
      setResponse(message);
    }
  };

  const refreshPageHandler = () => {
    window.location.reload();
  };

  return (
    <>
      <header>
        <h1>HexOcean Dishes</h1>
        {!response && <p>Add your favourite dish now!</p>}
      </header>
      <main className={response ? "center" : ""}>
        {/* TODO wyodrębnić */}
        {!response && <DishForm onSubmit={sendDataHandler} />}
        {response && responseOk && <p>Your dish was sent successfully!</p>}
        {response && !responseOk && (
          <>
            <p className="error">There was a problem with the request.</p>
            <p>
              Details:{" "}
              {Object.entries(response).map(([field, value], index, arr) => (
                <Fragment key={field}>
                  {value} ({field}){index === arr.length - 1 ? "." : "; "}
                </Fragment>
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
