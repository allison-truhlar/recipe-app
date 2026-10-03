import axios from "axios";

type Recipe = {
  id: number;
  name: string;
  url: string | null;
  recipeIngredient: string[];
  recipeInstructions: string[];
  created_at: string;
};

export const getRecipes = async (): Promise<Recipe[]> => {
  const { data } = await axios.get("/api/recipes");
  return data;
};
