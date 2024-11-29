import { create } from "zustand";

export const useRecipeStore = create((set) => ({
  recipes: [], // Alterado para receitas

  // Adiciona uma nova receita
  addRecipe: (newRecipe) => set((state) => ({ recipes: [newRecipe, ...state.recipes] })),

  // Atualiza a lista de receitas
  setRecipes: (newRecipes) => set({ recipes: newRecipes }),

  // Deleta uma receita pelo ID
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter((recipe) => recipe.id !== id),
  })),

  // Atualiza uma receita
  updateRecipe: (newRecipe) => set((state) => ({
    recipes: state.recipes.map((recipe) => recipe.id === newRecipe.id ? newRecipe : recipe),
  })),
}));
