import { DishFormValues } from "../components/DishForm";

export default (data: DishFormValues) => {
  const dataFiltered: DishFormValues = {
    name: data.name,
    preparation_time: data.preparation_time,
    type: data.type,
  };

  if (data.type === "pizza") {
    dataFiltered.no_of_slices = data.no_of_slices;
    dataFiltered.diameter = data.diameter;
  }
  if (data.type === "soup") {
    dataFiltered.spiciness_scale = data.spiciness_scale;
  }
  if (data.type === "sandwich") {
    dataFiltered.slices_of_bread = data.slices_of_bread;
  }

  return dataFiltered;
};
