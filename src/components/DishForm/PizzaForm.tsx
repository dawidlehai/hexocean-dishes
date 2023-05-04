import { Field } from "redux-form";

const PizzaForm = () => {
  return (
    <div className="appear">
      <label>
        Number of slices:{" "}
        <Field
          name="no_of_slices"
          component="input"
          type="number"
          min="1"
          placeholder="4"
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
          placeholder="33.4"
          required
        />
      </label>
    </div>
  );
};

export default PizzaForm;
