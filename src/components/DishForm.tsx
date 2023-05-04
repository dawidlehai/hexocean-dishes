import { useState } from "react";
import { Field, reduxForm } from "redux-form";

import PizzaForm from "./DishForm/PizzaForm";
import SoupForm from "./DishForm/SoupForm";
import SandwichForm from "./DishForm/SandwichForm";

const DishForm = (props) => {
  const { handleSubmit, pristine, submitting } = props;

  const [dishType, setDishType] = useState("");

  const handleDishTypeChange = (event) => {
    setDishType(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Dish Name:{" "}
        <Field
          name="name"
          component="input"
          type="text"
          pattern="[\w\s]+"
          placeholder="HexOcean Pizza"
          required
        />
      </label>

      <label>
        Preparation Time:{" "}
        <Field
          name="preparation_time"
          component="input"
          type="text"
          pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
          placeholder="01:30:22"
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
        Submit
      </button>
    </form>
  );
};

export default reduxForm({
  form: "dish",
})(DishForm);
