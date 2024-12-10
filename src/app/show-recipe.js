import { View, StyleSheet, Text, TextInput, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useRecipeStore } from '../stores/useRecipeStore';
import { fetchAuth } from '../utils/fetchAuth';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import { ScrollView } from 'react-native-web';

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
  try {
    // Faz a requisição DELETE para o backend
    const response = await fetchAuth(`http://localhost:3000/recipe/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Receita excluída com sucesso:', data);

      // Atualiza o estado local removendo a receita
      deleteRecipe(+id);
      router.back(); // Retorna à página anterior
    } else if (response.status === 401) {
      const errorData = await response.json();
      console.error('Erro de validação ao excluir receita:', errorData.fieldErrors);
      alert('Erro de validação: ' + JSON.stringify(errorData.fieldErrors));
    } else if (response.status === 404) {
      const errorData = await response.json();
      console.error('Receita não encontrada:', errorData.error);
      alert(errorData.error);
    } else {
      const errorData = await response.json();
      console.error('Erro desconhecido ao excluir receita:', errorData);
      alert('Erro ao excluir a receita. Tente novamente mais tarde.');
    }
  } catch (error) {
    console.error('Erro de conexão ao excluir receita:', error);
    alert('Erro ao conectar com o servidor. Tente novamente mais tarde.');
  }
};

  
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.inicio}>
        <BackButton href="home" />
        <View style={styles.botoes}>
          <Button onPress={() => router.push({ pathname: '/update-recipe', params: { id } })}>Editar</Button>
          <Button onPress={handleDelete}>Excluir</Button>
        </View>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.content}>
            <Text style={styles.title}>{recipe.title}</Text>
            <Text style={styles.comment}>{recipe.comment}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>Ingredients</Text>
        <View>
          <TextInput style={styles.input} value={recipe.ingredients || ''} multiline />
        </View>
        <Text style={styles.subtitle}>Modo de Preparo</Text>
        <View>
          <TextInput style={styles.input} value={recipe.step_by_step || ''} multiline />
        </View>
        <Image style={styles.logo} source={{ uri: recipe.recipe_image }} />
      </ScrollView>
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
    width: 390,
    borderRadius: 30,
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    backgroundColor: "#F8E0C7",
    color: "#96570F"
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "#96570F",
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
    color: "#96570F"
  },
  logo: {
    width: "auto",
    height: 250,
    borderRadius: 10,
  },
  content: {
    gap: 6,
  },
  title: {

    fontSize: 35,
    fontWeight: 'bold',
    color: "#96570F"
  },
  comment: {
    color: "#96570F",
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 5,
    borderRadius: 5,
    height: 250,
    color: "#96570F",
  },
  inicio: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  botoes: {
    display: "flex",
    marginLeft: 10,
    flexDirection: 'row',
    gap: 2,

  }
});