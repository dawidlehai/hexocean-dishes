import { Field } from "redux-form";

const SoupForm = () => {
  return (
    <label>
      Spiciness Scale (1-10):{" "}
      <Field
        name="spiciness_scale"
        component="input"
        type="number"
        min="1"
        max="10"
        required
      />
    </label>
  );
};

export default SoupForm;
