import { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, Picker } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRecipeStore } from '../stores/useRecipeStore';
import { fetchAuth } from '../utils/fetchAuth';
import BackButton from '../components/BackButton';
import { inputStyle } from '../components/InputText';
import Button from '../components/Button';

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

  // Função para carregar categorias se necessário
  const loadCategories = async () => {
    try {
      const response = await fetchAuth('http://localhost:3000/category/list');
      const data = await response.json();
      setCategory(data.categories[0]?.id || ''); // Defina um valor inicial
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
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
        updateRecipe(data.recipe);  // Atualiza o estado global com a receita editada
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
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Digite o título da receita..."
        placeholderTextColor="#DDDDDD"
      />

      <Text style={styles.label}>Ingredientes:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        onChangeText={setIngredients}
        value={ingredients}
        placeholder="Escreva os ingredientes..."
        placeholderTextColor="#DDDDDD"
        multiline
      />

      <Text style={styles.label}>Modo de Preparo:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        onChangeText={setMethod}
        value={method}
        placeholder="Escreva o modo de preparo..."
        placeholderTextColor="#DDDDDD"
        multiline
      />

      <Text style={styles.label}>Categoria:</Text>
      <Picker
        selectedValue={category}
        style={styles.input}
        onValueChange={(itemValue) => setCategory(Number(itemValue))}
      >
        <Picker.Item label="Selecione uma categoria" value="" />
      </Picker>

      <Text style={styles.label}>Comentário (opcional):</Text>
      <TextInput
        style={[styles.input, styles.commentArea]}
        onChangeText={setComment}
        value={comment}
        placeholder="Adicione um comentário..."
        placeholderTextColor="#DDDDDD"
        multiline
      />

      <Text style={styles.label}>URL da imagem:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setRecipeImg}
        value={recipe_image}
        placeholder="Adicione a URL da imagem"
        placeholderTextColor="#DDDDDD"
      />

      <Button onPress={handleUpdateRecipe}>Atualizar Receita</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF',
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
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