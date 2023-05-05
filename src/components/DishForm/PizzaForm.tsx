import { FocusEventHandler } from "react";
import { Field } from "redux-form";

export interface SubFormProps {
  onBlur: FocusEventHandler<HTMLInputElement>;
}

const PizzaForm = ({ onBlur }: SubFormProps) => {
  return (
    <div className="appear">
      <label>
        Number of slices*:{" "}
        <Field
          name="no_of_slices"
          component="input"
          type="number"
          min="1"
          placeholder="4"
          required
          onBlur={onBlur}
        />
      </label>
      <label>
        Diameter*:{" "}
        <Field
          name="diameter"
          component="input"
          type="number"
          min="0.01"
          step="0.01"
          placeholder="33.4"
          required
          onBlur={onBlur}
        />
      </label>
    </div>
  );
};

export default PizzaForm;
