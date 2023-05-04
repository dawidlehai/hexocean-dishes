import { Field } from "redux-form";

const SoupForm = () => {
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
        />
      </label>
    </div>
  );
};

export default SoupForm;
