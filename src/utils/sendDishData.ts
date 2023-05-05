import { DishFormValues } from "../components/DishForm";
import { API_URL } from "../config";

export default async (data: DishFormValues) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const apiResponse = await fetch(API_URL, options);

    return apiResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
