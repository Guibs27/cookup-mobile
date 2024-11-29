import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Image, ImageBackground, TouchableOpacity, Button as RNButton } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRecipeStore } from '../../stores/useRecipeStore';
import { fetchAuth } from '../../utils/fetchAuth';
import Button from '../../components/Button';

export default function CreateRecipe() {
  const { addRecipe } = useRecipeStore();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [method, setMethod] = useState('');
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  // Função para escolher uma imagem
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Armazena o caminho da imagem
    }
  };

  // Função para criar uma nova receita
  const handleCreateRecipe = async () => {
    const recipe = {
      title,
      ingredients,
      method,
      comment,
      category,
      image, // URL ou base64 da imagem
    };

    const response = await fetchAuth('http://localhost:3000/recipe', {
      method: 'POST',
      body: JSON.stringify(recipe),
    });

    if (response.ok) {
      const data = await response.json();
      addRecipe(data.recipe);
      alert('Receita criada com sucesso!');
    } else {
      alert('Erro ao criar receita!');
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Título */}
        <Text style={styles.title}>Adicionar receita</Text>

        {/* Área para selecionar a imagem */}
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.imageText}>Adicione uma foto para sua receita</Text>
          )}
        </TouchableOpacity>

        {/* Inputs para os dados da receita */}
        <Text style={styles.label}>Título:</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira um título para sua receita"
          placeholderTextColor="gray"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Ingredientes:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escreva os ingredientes"
          placeholderTextColor="gray"
          value={ingredients}
          onChangeText={setIngredients}
          multiline
        />

        <Text style={styles.label}>Modo de preparo:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escreva o modo de preparo"
          placeholderTextColor="gray"
          value={method}
          onChangeText={setMethod}
          multiline
        />

        <Text style={styles.label}>Adicione um comentário (opcional):</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escreva o comentário"
          placeholderTextColor="gray"
          value={comment}
          onChangeText={setComment}
          multiline
        />

        {/* Botão para selecionar a categoria */}
        <TouchableOpacity style={styles.categoryButton} onPress={() => alert('Selecione a categoria')}>
          <Text style={styles.categoryButtonText}>
            {category || 'Selecione a categoria da sua receita...'}
          </Text>
        </TouchableOpacity>

        {/* Botão para publicar */}
        <Button onPress={handleCreateRecipe}>Publicar</Button>
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
    color: '#DA8C3C',
    marginBottom: 15,
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
    color: 'gray',
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
