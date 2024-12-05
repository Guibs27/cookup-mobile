import { View, StyleSheet, Text, TextInput, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { fetchAuth } from '../utils/fetchAuth';
import { inputStyle } from '../components/InputText'
import Button from '../components/Button';

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  const fetchCategories = async () => {
    const response = await fetchAuth('http://localhost:3000/category/list');
    if (response.ok) {
      const data = await response.json();
      setCategories(data.categories);
    }
  };

  const handleCreateCategory = async () => {
    if (!name.trim()) {
      alert("O nome da categoria é obrigatório!");
      return;
    }

    const response = await fetchAuth('http://localhost:3000/category', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      fetchCategories();
      setName('');
      alert("Categoria criada com sucesso!");
    } else {
      alert("Erro ao criar categoria.");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    console.log("ID da categoria a ser deletada:", categoryId); // Adicione este log
  
    const response = await fetchAuth(`http://localhost:3000/category/${categoryId}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      fetchCategories();
      alert("Categoria excluída com sucesso!");
    } else {
      alert("Erro ao excluir categoria.");
    }
  };  

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Categorias</Text>

      {/* Campo para adicionar nova categoria */}
      <TextInput
        style={inputStyle.input}
        placeholder="Digite o nome da categoria"
        placeholderTextColor="#b8b8b8"
        value={name}
        onChangeText={setName}
      />
      <Button onPress={handleCreateCategory}>
        <Text>Adicionar Categoria</Text>
      </Button>

      {/* Lista de categorias */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryText}>{item.name}</Text>
            <Pressable style={styles.deleteButton} onPress={() => handleDeleteCategory(item.id)}>
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 25,
    fontWeight: '400',
    color: '#DA8C3C',
    marginBottom: 15
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  categoryText: {
    fontSize: 16
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 5,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
});
