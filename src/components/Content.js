import { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useRecipeStore } from '../stores/useRecipeStore';
import { fetchAuth } from '../utils/fetchAuth';
import CardRecipe from './CardRecipe'; 

export default function Content() {
  const { recipes, setRecipes } = useRecipeStore();
  console.log('Recipes: ', recipes);

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetchAuth('http://localhost:3000/recipe/list'); 
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRecipes(data.recipes);
        return;
      }
      console.log('Erro ao carregar receitas');
      return;
    };

    getRecipes();
  }, []);

  return (
    <View style={styles.content}>
      {recipes.length === 0 && <Text>Loading...</Text>}

      {
        recipes.map((recipe) => (
          <CardRecipe
            key={recipe.id}
            id={recipe.id}
            title={recipe.title} 
            recipe_image={recipe.recipe_image} 
            comment={recipe.comment}
            ingredients={recipe.ingredients}
          />
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 10,
    padding: 15,
  },
});