import { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import CardRecipe from './CardRecipe'; // CardRecipe ao invés de CardAccount
import { useRecipeStore } from '../stores/useRecipeStore'; // Altere para usar useRecipeStore
import { fetchAuth } from '../utils/fetchAuth';

export default function Content() {
  const { recipes, setRecipes } = useRecipeStore(); // Usando recipes ao invés de accounts

  console.log('Recipes: ', recipes);

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetchAuth('http://localhost:3000/recipe/list'); // Alterado para o endpoint de receitas
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRecipes(data.recipes); // Agora está setando recipes ao invés de accounts
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
            title={recipe.title} // Alterado para usar `title` ao invés de `service`
            recipe_image={recipe.recipe_image} // Alterado para usar `recipe_image` ao invés de `imgUrl`
            ingredients={recipe.ingredients} // Alterado para usar `ingredients` ao invés de `userName`
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