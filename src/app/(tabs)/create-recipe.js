import { View, StyleSheet, Text, TextInput, Picker, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';
import { useRecipeStore } from '../../stores/useRecipeStore';
import { fetchAuth } from '../../utils/fetchAuth';
import { inputStyle } from '../../components/InputText'
import Button from '../../components/Button';

export default function CreateRecipe() {
  const { addRecipe } = useRecipeStore();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [step_by_step, setSteps] = useState('');
  const [comment, setComment] = useState('');
  const [category, setCategory] = useState('');
  const [recipe_image, setRecipeImg] = useState('');
  const [categories, setCategories] = useState([]); 

  const loadCategories = async () => {
    try {
      const response = await fetchAuth('http://localhost:3000/category/list');
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreateRecipe = async () => {
    const recipe = {
      title,
      ingredients,
      step_by_step,
      comment,
      category_id: category,
      recipe_image,
    };

    if (comment.trim() !== "") {
      recipe.comment = comment;
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
          style={inputStyle.input}
          placeholder="Insira um título para sua receita"
          placeholderTextColor="#b8b8b8"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Ingredientes:</Text>
        <TextInput
          style={[inputStyle.input, styles.textArea]}
          placeholder="Escreva os ingredientes"
          placeholderTextColor="#b8b8b8"
          value={ingredients}
          onChangeText={setIngredients}
          multiline
        />

        <Text style={styles.label}>Modo de preparo:</Text>
        <TextInput
          style={[inputStyle.input, styles.textArea]}
          placeholder="Escreva o modo de preparo"
          placeholderTextColor="#b8b8b8"
          value={step_by_step}
          onChangeText={setSteps}
          multiline
        />

        <Text style={styles.label}>Comentário (opcional):</Text>
        <TextInput
          style={[inputStyle.input, styles.commentArea]}
          placeholder="Adicione um comentário"
          placeholderTextColor="#b8b8b8"
          value={comment}
          onChangeText={setComment}
          multiline
        />

        <Text style={styles.label}>URL da imagem:</Text>
        <TextInput
          style={inputStyle.input}
          placeholder="Adicione a URL da imagem"
          placeholderTextColor="#b8b8b8"
          value={recipe_image}
          onChangeText={setRecipeImg}
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

        <View style={styles.buttonArea}>
          <Button onPress={handleCreateRecipe}>Adicionar</Button>
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
    height: 'auto',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    color: '#DA8C3C',
    marginBottom: 22,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  commentArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 17,
    // fontWeight: '600',
    color: '#DA8C3C',
    marginBottom: 5,
    marginTop: 8,
  },
  buttonArea: {
    marginTop: 10
  }
});