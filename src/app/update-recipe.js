import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, Picker, ImageBackground, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRecipeStore } from '../stores/useRecipeStore';
import { fetchAuth } from '../utils/fetchAuth';
import { inputStyle } from '../components/InputText';
import Button from '../components/Button';
import BackButton from '../components/BackButton';

export default function UpdateRecipe() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { recipes, updateRecipe } = useRecipeStore();
  const recipe = recipes.find((item) => item.id === +id);

  const [title, setTitle] = useState(recipe?.title || '');
  const [ingredients, setIngredients] = useState(recipe?.ingredients || '');
  const [method, setMethod] = useState(recipe?.step_by_step || '');
  const [category, setCategory] = useState(recipe?.category_id || '');
  const [comment, setComment] = useState(recipe?.comment || '');
  const [recipe_image, setRecipeImg] = useState(recipe?.recipe_image || '');
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    try {
      const response = await fetchAuth('http://localhost:3000/category/list');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      } else {
        console.error('Erro ao carregar categorias:', await response.json());
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleUpdateRecipe = async () => {
    const updatedRecipe = {
      title,
      ingredients,
      step_by_step: method,
      comment,
      category_id: category,
      recipe_image,
    };

    try {
      const response = await fetchAuth(`http://localhost:3000/recipe/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedRecipe),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        updateRecipe(data.recipe);
        Alert.alert('Sucesso', 'Receita atualizada com sucesso!');
        router.back();
      } else {
        Alert.alert('Erro', 'Falha ao atualizar a receita. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao atualizar a receita:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar atualizar a receita.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.header}>
        <BackButton href="home" />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Editar Receita</Text>

        <Text style={styles.label}>Título:</Text>
        <TextInput
          style={inputStyle.input}
          onChangeText={setTitle}
          value={title}
          placeholder="Digite o título da receita"
          placeholderTextColor="#DDDDDD"
        />

        <Text style={styles.label}>Ingredientes:</Text>
        <TextInput
          style={[inputStyle.input, styles.textArea]}
          onChangeText={setIngredients}
          value={ingredients}
          placeholder="Escreva os ingredientes"
          placeholderTextColor="#DDDDDD"
          multiline
        />

        <Text style={styles.label}>Modo de Preparo:</Text>
        <TextInput
          style={[inputStyle.input, styles.textArea]}
          onChangeText={setMethod}
          value={method}
          placeholder="Escreva o modo de preparo"
          placeholderTextColor="#DDDDDD"
          multiline
        />

        <Text style={styles.label}>Categoria:</Text>
        <Picker
          selectedValue={category}
          style={inputStyle.input}
          onValueChange={(itemValue) => setCategory(Number(itemValue))}
        >
          <Picker.Item label="Selecione uma categoria" value="" />
          {categories.map((cat) => (
            <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
          ))}
        </Picker>

        <Text style={styles.label}>Comentário (opcional):</Text>
        <TextInput
          style={[inputStyle.input, styles.commentArea]}
          onChangeText={setComment}
          value={comment}
          placeholder="Adicione um comentário"
          placeholderTextColor="#DDDDDD"
          multiline
        />

        <Text style={styles.label}>URL da imagem:</Text>
        <TextInput
          style={inputStyle.input}
          onChangeText={setRecipeImg}
          value={recipe_image}
          placeholder="Adicione a URL da imagem"
          placeholderTextColor="#DDDDDD"
        />

        <Button onPress={handleUpdateRecipe}>Atualizar Receita</Button>
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
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#DA8C3C',
    marginBottom: 15,
  },
  label: {
    fontSize: 17,
    // fontWeight: '600',
    color: '#DA8C3C',
    marginBottom: 5,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  commentArea: {
    height: 80,
    textAlignVertical: 'top',
  },
});