import { View, StyleSheet, Text, TextInput, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useRecipeStore } from '../stores/useRecipeStore';
import { fetchAuth } from '../utils/fetchAuth';
import BackButton from '../components/BackButton';
import Button from '../components/Button';

export default function ShowPass() {
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
    const response = await fetchAuth(`http://localhost:3000/recipe/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      deleteRecipe(+id);
      router.back();
      return;
    }
    console.log('Erro ao carregar receitas');
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
    >
      <BackButton href="home" />

      <View style={styles.container}>
        <View style={styles.card}>
          <Image style={styles.logo} source={{ uri: recipe.recipe_image }} />
          <View style={styles.content}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.comment}>{recipe.comment}</Text>
          </View>
        </View>

        <View>
          <TextInput style={styles.input} value={recipe.ingredients || ''} multiline />
        </View>

        <View style={{ flexDirection: 'row', gap: 20, flex: 1, justifyContent: 'space-between' }}>
          <Button onPress={() => router.push({ pathname: '/update-recipe', params: { id } })}>Editar</Button>
          <Button onPress={handleDelete}>Excluir</Button>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'center',
    width: 'auto',
    height: 'auto'
  },
  container: {
    padding: 20,
    marginTop: 100
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
  card: {
    padding: 30,
    flexDirection: 'row',
    gap: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
  },
  content: {
    gap: 6,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  comment: {
    color: '#777777',
  },
  input: {
    borderWidth: 1,
    borderColor: '#444444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 5,
    borderRadius: 5,
  },
});