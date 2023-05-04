import { Field } from "redux-form";

const PizzaForm = () => {
  return (
    <>
      <label>
        Number of Slices:{" "}
        <Field
          name="no_of_slices"
          component="input"
          type="number"
          min="1"
          required
        />
      </label>
      <label>
        Diameter:{" "}
        <Field
          name="diameter"
          component="input"
          type="number"
          min="0.01"
          step="0.01"
          required
        />
      </label>
    </>
  );
};

export default PizzaForm;
