import { useState, ChangeEvent, FormEvent } from "react";
import { Field, reduxForm } from "redux-form";

import PizzaForm from "./DishForm/PizzaForm";
import SoupForm from "./DishForm/SoupForm";
import SandwichForm from "./DishForm/SandwichForm";

interface DishFormProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  pristine: boolean;
  submitting: boolean;
}

const DishForm = ({ handleSubmit, pristine, submitting }: DishFormProps) => {
  const [dishType, setDishType] = useState("");

  const handleDishTypeChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setDishType(target.value);
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    if (target.validity.patternMismatch && target.name === "name")
      target.setCustomValidity(
        "Please use only letters, numbers, spaces, and underscores."
      );
    if (target.validity.patternMismatch && target.name === "preparation_time")
      target.setCustomValidity(
        "Please provide preparation time in the HH:MM:SS (hours, minutes, seconds) format."
      );
    if (!target.validity.patternMismatch) target.setCustomValidity("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Dish Name:{" "}
        <Field
          name="name"
          component="input"
          type="text"
          pattern="^[\w\s]+$"
          placeholder="HexOcean Pizza"
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Preparation Time:{" "}
        <Field
          name="preparation_time"
          component="input"
          type="text"
          pattern="^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$"
          placeholder="01:30:22"
          onChange={handleInputChange}
          required
        />
      </label>

      <label>
        Dish Type:{" "}
        <Field
          name="type"
          component="select"
          onChange={handleDishTypeChange}
          required>
          <option value=""></option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </Field>
      </label>

      {dishType === "pizza" && <PizzaForm />}
      {dishType === "soup" && <SoupForm />}
      {dishType === "sandwich" && <SandwichForm />}

      <button type="submit" disabled={pristine || submitting}>
        {submitting ? "Sending..." : "Submit"}
      </button>
    </form>
  );
};

export default reduxForm({
  form: "dish",
})(DishForm);
