import { View, StyleSheet, Text, TextInput, ImageBackground, TouchableOpacity, Button as RNButton } from 'react-native';
import { useState } from 'react';
import { useRecipeStore } from '../../stores/useRecipeStore';
import { fetchAuth } from '../../utils/fetchAuth';
import Button from '../../components/Button';

export default function CreateRecipe() {
  const { addRecipe } = useRecipeStore();

  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('');
  const [recipe_image, setRecipeImg] = useState('');

  // Função para criar uma nova receita
  const handleCreateRecipe = async () => {
    const recipe = {
      title,
      ingredients,
      steps,
      comment,
      category,
      recipe_image
    };

    try {
      const response = await fetchAuth('http://localhost:3000/recipe', {
        method: 'POST',
        body: JSON.stringify(recipe),
      });

      if (response.ok) {
        alert('Receita criada com sucesso!');
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
        <Text style={styles.label}>URL da Imagem:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira a URL da imagem para sua receita"
          placeholderTextColor="#8a8a8a"
          value={recipe_image}
          onChangeText={setRecipeImg}
        />

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
          value={steps}
          onChangeText={setSteps}
          multiline
        />

        <Text style={styles.label}>Adicione um comentário (opcional):</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escreva o comentário"
          placeholderTextColor="#8a8a8a"
          value={comment}
          onChangeText={setComment}
          multiline
        />

        <TouchableOpacity style={styles.categoryButton} onPress={() => alert('Selecione a categoria')}>
          <Text style={styles.categoryButtonText}>
            {category || 'Selecione a categoria da sua receita...'}
          </Text>
        </TouchableOpacity>

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
    height: 'auto'
  },
  container: {
    flex: 1,
    // backgroundColor: '#FFF8F0',
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: '400',
    color: '#DA8C3C',
    marginBottom: 20,
  },
  imagePicker: {
    backgroundColor: '#EDEAEA',
    borderColor: '#DA8C3C',
    borderWidth: 1,
    borderRadius: 10,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  imageText: {
    color: '#8a8a8a',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  input: {
    backgroundColor: '#EDEAEA',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    // borderColor: '#DA8C3C',
    // borderWidth: 1,
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
  categoryButton: {
    backgroundColor: '#EDEAEA',
    borderRadius: 25,
    padding: 10,
    // borderWidth: 1,
    // borderColor: '#DA8C3C',
    marginBottom: 15,
  },
  categoryButtonText: {
    color: 'gray',
    fontSize: 16,
    marginLeft: 8
  },
});