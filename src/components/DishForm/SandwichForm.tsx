import { Field } from "redux-form";

const SandwichForm = () => {
  return (
    <label>
      Number of slices of bread required:{" "}
      <Field
        name="slices_of_bread"
        component="input"
        type="number"
        min="1"
        required
      />
    </label>
  );
};

export default SandwichForm;
