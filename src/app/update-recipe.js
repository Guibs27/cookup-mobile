import { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRecipeStore } from '../stores/useRecipeStore';
import { fetchAuth } from '../utils/fetchAuth';
import Button from '../components/Button';

export default function UpdateRecipe() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { recipes, updateRecipe } = useRecipeStore();
  const recipe = recipes.find((item) => item.id === +id);

  // States para editar os campos da receita
  const [title, setTitle] = useState(recipe?.title || '');
  const [ingredients, setIngredients] = useState(recipe?.ingredients || '');
  const [method, setMethod] = useState(recipe?.method || '');
  const [category, setCategory] = useState(recipe?.category || '');
  const [comment, setComment] = useState(recipe?.comment || '');

  const handleUpdateRecipe = async () => {
    const updatedRecipe = {
      title,
      ingredients,
      method,
      category,
      comment,
    };

    try {
      const response = await fetchAuth(`http://localhost:3000/recipe/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedRecipe),
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
      <TextInput
        style={styles.input}
        onChangeText={setCategory}
        value={category}
        placeholder="Digite a categoria..."
        placeholderTextColor="#DDDDDD"
      />

      <Text style={styles.label}>Comentário (opcional):</Text>
      <TextInput
        style={styles.input}
        onChangeText={setComment}
        value={comment}
        placeholder="Adicione um comentário..."
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
    height: 80,
    textAlignVertical: 'top',
  },
});