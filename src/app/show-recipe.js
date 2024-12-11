import { View, StyleSheet, Text, ImageBackground, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchAuth } from '../utils/fetchAuth';
import { Image } from 'expo-image';
import { useRecipeStore } from '../stores/useRecipeStore';
import BackButton from '../components/BackButton';
import Button from '../components/Button';

export default function ShowRecipe() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { recipes, deleteRecipe } = useRecipeStore();
  const recipe = recipes.find((item) => item.id === +id);

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Receita não encontrada!</Text>
        <Button onPress={() => router.back()}>Voltar</Button>
      </View>
    );
  }

  const handleDelete = async () => {
    try {
      const response = await fetchAuth(`http://localhost:3000/recipe/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        deleteRecipe(+id);
        router.back();
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Erro ao excluir a receita.');
      }
    } catch (error) {
      alert('Erro ao conectar com o servidor.');
    }
  };

  const categoryDisplay = typeof recipe.category === 'object' ? recipe.category.name : recipe.category;

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.header}>
        <BackButton href="home" />
        <View style={styles.actionButtons}>
          <Button onPress={() => router.push({ pathname: '/update-recipe', params: { id } })}>Editar</Button>
          <Button onPress={handleDelete}>Excluir</Button>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.category}>Categoria: {categoryDisplay}</Text>
        <Image style={styles.image} source={{ uri: recipe.recipe_image }} />

        <Text style={styles.subtitle}>Ingredientes:</Text>
        <Text style={styles.text}>{recipe.ingredients}</Text>

        <Text style={styles.subtitle}>Modo de Preparo:</Text>
        <Text style={styles.text}>{recipe.step_by_step}</Text>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'center',
    width: 'auto',
    height: 'auto',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  content: {
    backgroundColor: '#F8E0C7',
    borderRadius: 20,
    margin: 20,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#96570F',
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#96570F',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#96570F',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#96570F',
    marginBottom: 20,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});