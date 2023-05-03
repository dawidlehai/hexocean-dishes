import { Field, reduxForm } from "redux-form";

const DishForm = (props) => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
        <div>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Hawaian Pizza"
          />
        </div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "dish",
})(DishForm);
