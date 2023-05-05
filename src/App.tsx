import { useState, Fragment } from "react";
import { FormSubmitHandler } from "redux-form";
import type { DishFormValues } from "./components/DishForm";
import filterDataByDishType from "./utils/filterDataByDishType";
import DishForm from "./components/DishForm";
import "./App.css";
import sendDishData from "./utils/sendDishData";
import SubmitResultPage from "./components/SubmitResultPage";

export interface responseType {
  error?: string;
  data?: DishFormValues;
}

function App() {
  const [response, setResponse] = useState<responseType | undefined>();
  const [responseOk, setResponseOk] = useState(true);

  const sendDataHandler: FormSubmitHandler<object> = async (data: object) => {
    const dataFiltered = filterDataByDishType(data as DishFormValues);

    try {
      const apiResponse = await sendDishData(dataFiltered);

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

  return (
    <>
      <header>
        <h1>HexOcean Dishes</h1>
        {!response && <p>Add your favourite dish now!</p>}
      </header>
      <main className={response ? "center" : ""}>
        {!response && <DishForm onSubmit={sendDataHandler} />}
        {response && (
          <SubmitResultPage responseOk={responseOk} response={response} />
        )}
      </main>
    </>
  );
}

export default App;
