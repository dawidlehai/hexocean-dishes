import { useState, ChangeEvent, FormEvent, FocusEventHandler } from "react";
import { Field, reduxForm } from "redux-form";

import PizzaForm from "./DishForm/PizzaForm";
import SoupForm from "./DishForm/SoupForm";
import SandwichForm from "./DishForm/SandwichForm";

export interface DishFormValues {
  name: string;
  preparation_time: string;
  type: "pizza" | "soup" | "sandwich";
  no_of_slices?: number;
  diameter?: number;
  spiciness_scale?: number;
  slices_of_bread?: number;
}

interface DishFormProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
}

const DishForm = ({ handleSubmit, submitting }: DishFormProps) => {
  const [dishType, setDishType] = useState("");

  const handleDishTypeChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setDishType(target.value);
  };

  const handlePrepTimeChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.validity.patternMismatch) {
      target.setCustomValidity(
        "Please provide preparation time in the HH:MM:SS (hours, minutes, seconds) format. The maximum value is 23:59:59."
      );
    } else {
      target.setCustomValidity("");
    }
  };

  const handleInputBlur: FocusEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = ({ target }) => target.reportValidity();

  return (
    <form onSubmit={handleSubmit} className="dish-form">
      <label>
        Dish name*:{" "}
        <Field
          name="name"
          component="input"
          type="text"
          placeholder="HexOcean Pizza"
          required
          onBlur={handleInputBlur}
        />
      </label>

      <label>
        Preparation time*:{" "}
        <Field
          name="preparation_time"
          component="input"
          type="text"
          pattern="^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$"
          placeholder="01:30:22"
          required
          onChange={handlePrepTimeChange}
          onBlur={handleInputBlur}
        />
      </label>

      <label>
        Dish type*:{" "}
        <Field
          name="type"
          component="select"
          onChange={handleDishTypeChange}
          required
          onBlur={handleInputBlur}>
          <option value=""></option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </Field>
      </label>

      {dishType === "pizza" && <PizzaForm onBlur={handleInputBlur} />}
      {dishType === "soup" && <SoupForm onBlur={handleInputBlur} />}
      {dishType === "sandwich" && <SandwichForm onBlur={handleInputBlur} />}

      <button
        type="submit"
        disabled={submitting}
        className={submitting ? "loading" : ""}>
        {submitting ? "Sending..." : "Submit"}
      </button>

      <p className="info">* all fields are required</p>
    </form>
  );
};

export default reduxForm({
  form: "dish",
})(DishForm);
