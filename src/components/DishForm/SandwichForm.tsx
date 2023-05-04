import { Field } from "redux-form";

const SandwichForm = () => {
  return (
    <div className="appear">
      <label>
        Number of slices of bread required:{" "}
        <Field
          name="slices_of_bread"
          component="input"
          type="number"
          min="1"
          placeholder="2"
          required
        />
      </label>
    </div>
  );
};

export default SandwichForm;
