import { Field } from "redux-form";
import type { SubFormProps } from "./PizzaForm";

const SoupForm = ({ onBlur }: SubFormProps) => {
  return (
    <div className="appear">
      <label>
        Spiciness scale (1-10):{" "}
        <Field
          name="spiciness_scale"
          component="input"
          type="number"
          min="1"
          max="10"
          placeholder="5"
          required
          onBlur={onBlur}
        />
      </label>
    </div>
  );
};

export default SoupForm;
