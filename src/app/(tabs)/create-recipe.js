import { View, StyleSheet, Text, TextInput, ImageBackground } from 'react-native';
import { useState } from 'react';
import { useRecipeStore } from '../../stores/useRecipeStore';
import { fetchAuth } from '../../utils/fetchAuth';
import Button from '../../components/Button';

export default function CreateRecipe() {
  const { addRecipe } = useRecipeStore();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [step_by_step, setSteps] = useState('');
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('');
  const [recipe_image, setRecipeImg] = useState('');

  const handleCreateRecipe = async () => {
    const recipe = {
      title,
      ingredients,
      step_by_step, 
      comment,
      category,
      recipe_image
    };

    console.log("Dados da receita antes do envio:", recipe);

    try {
      const response = await fetchAuth('http://localhost:3000/recipe', {
        method: 'POST',
        body: JSON.stringify(recipe),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert('Receita criada com sucesso!');
        addRecipe(data.recipe);
      } else {
        const errorData = await response.json();
        alert(`${errorData.error}`);
      }
    } catch (error) {
      console.error('Erro ao criar receita:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Adicionar receita</Text>

        <Text style={styles.label}>Título:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira um título para sua receita"
          placeholderTextColor="#8a8a8a"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Ingredientes:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escreva os ingredientes"
          placeholderTextColor="#8a8a8a"
          value={ingredients}
          onChangeText={setIngredients}
          multiline
        />

        <Text style={styles.label}>Modo de preparo:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escreva o modo de preparo"
          placeholderTextColor="#8a8a8a"
          value={step_by_step}
          onChangeText={setSteps}
          multiline
        />

        <Text style={styles.label}>Comentário (opcional):</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Adicione um comentário"
          placeholderTextColor="#8a8a8a"
          value={comment}
          onChangeText={setComment}
          multiline
        />

        <Text style={styles.label}>URL da imagem:</Text>
        <TextInput
          style={styles.input}
          placeholder="Adicione a URL da imagem"
          placeholderTextColor="#8a8a8a"
          value={recipe_image}
          onChangeText={setRecipeImg}
        />

        <Text style={styles.label}>Categoria:</Text>
        <TextInput
          style={styles.input}
          placeholder="Escolha a categoria"
          placeholderTextColor="#8a8a8a"
          value={category}
          onChangeText={setCategory}
        />

        <Button onPress={handleCreateRecipe}>Adicionar</Button>
      </View>
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
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: '400',
    color: '#DA8C3C',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#EDEAEA',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    color: '#DA8C3C',
    marginBottom: 5,
  },
});