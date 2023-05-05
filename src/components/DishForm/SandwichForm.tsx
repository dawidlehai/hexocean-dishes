import { Field } from "redux-form";
import type { SubFormProps } from "./PizzaForm";

const SandwichForm = ({ onBlur }: SubFormProps) => {
  return (
    <div className="appear">
      <label>
        Number of slices of bread required*:{" "}
        <Field
          name="slices_of_bread"
          component="input"
          type="number"
          min="1"
          placeholder="2"
          required
          onBlur={onBlur}
        />
      </label>
    </div>
  );
};

export default SandwichForm;
