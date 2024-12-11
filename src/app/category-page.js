import { View, StyleSheet, Text, TextInput, FlatList, Pressable, ImageBackground } from 'react-native';
import { useState, useEffect } from 'react';
import { fetchAuth } from '../utils/fetchAuth';
import { inputStyle } from '../components/InputText';
import Feather from '@expo/vector-icons/Feather';
import Button from '../components/Button';
import BackButton from '../components/BackButton';

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null); 
  const [editedName, setEditedName] = useState('');

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
    } else {
      alert("Erro ao criar categoria.");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    const response = await fetchAuth(`http://localhost:3000/category/${categoryId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchCategories();
    } else {
      alert("Erro ao excluir categoria.");
    }
  };

  const handleEditCategory = async (categoryId) => {
    if (editingId === categoryId) {
      const originalCategory = categories.find((category) => category.id === categoryId);
      if (editedName.trim() === originalCategory.name) {
        setEditingId(null);
        return;
      }

      const response = await fetchAuth(`http://localhost:3000/category/${categoryId}`, {
        method: 'PUT',
        body: JSON.stringify({ name: editedName }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        fetchCategories();
      } else {
        alert("Erro ao atualizar categoria.");
      }

      setEditingId(null);
    } else {
      setEditingId(categoryId);
      const category = categories.find((category) => category.id === categoryId);
      setEditedName(category.name);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.header}>
        <BackButton href="home" />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Gerenciar Categorias</Text>

        <TextInput
          style={inputStyle.input}
          placeholder="Digite o nome da categoria..."
          placeholderTextColor="#b8b8b8"
          value={name}
          onChangeText={setName}
        />
        <Button style={styles.add_category} onPress={handleCreateCategory}>
          <Text>Adicionar Categoria</Text>
        </Button>

        <FlatList
          data={categories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.categoryItem}>
              {editingId === item.id ? (
                <TextInput
                  style={styles.editInput}
                  value={editedName}
                  onChangeText={setEditedName}
                />
              ) : (
                <Text style={styles.categoryText}>{item.name}</Text>
              )}
              <View style={styles.icons}>
                <Pressable onPress={() => handleEditCategory(item.id)}>
                  <Feather
                    name={editingId === item.id ? 'check' : 'edit-2'}
                    size={25}
                    color="#DA8C3C"
                  />
                </Pressable>
                <Pressable onPress={() => handleDeleteCategory(item.id)}>
                  <Feather
                    name="trash-2"
                    size={28}
                    color="#DA8C3C" 
                  />
                </Pressable>
              </View>
            </View>
          )}
        />
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
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    color: '#DA8C3C',
    marginBottom: 25,
  },
  add_category: {
    marginBottom: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 18,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  editInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    marginRight: 10,
  },
});