import { View, StyleSheet, Text, TextInput, Image, ImageBackground, TouchableOpacity, Button as RNButton } from 'react-native';
import { useState } from 'react';
import { useRecipeStore } from '../../stores/useRecipeStore';
import { fetchAuth } from '../../utils/fetchAuth';
import * as ImagePicker from 'expo-image-picker';
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
    const formData = new FormData();

    // Adiciona os dados da receita
    formData.append('title', title);
    formData.append('ingredients', ingredients);
    formData.append('method', method);
    formData.append('comment', comment);
    formData.append('category', category);

    // Adiciona a imagem ao FormData
    if (image) {
      const filename = image.split('/').pop();
      const fileType = filename.split('.').pop();
      formData.append('image', {
        uri: image,
        name: filename,
        type: `image/${fileType}`,
      });
    }

    try {
      const response = await fetch('http://localhost:3000/recipe', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        alert('Receita criada com sucesso!');
      } else {
        const errorData = await response.json();
        alert(`Erro: ${errorData.error}`);
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
          value={method}
          onChangeText={setMethod}
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

        {/* Botão para selecionar a categoria */}
        <TouchableOpacity style={styles.categoryButton} onPress={() => alert('Selecione a categoria')}>
          <Text style={styles.categoryButtonText}>
            {category || 'Selecione a categoria da sua receita...'}
          </Text>
        </TouchableOpacity>

        {/* Botão para publicar */}
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
