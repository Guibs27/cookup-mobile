import { View, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { useLoginStore } from '../stores/useLoginStore';
import { useRouter } from 'expo-router';
import Button from '../components/Button';

export default function UpdateUser() {
  const { avatar, name, birth_date, email, updateProfile } = useLoginStore();
  const router = useRouter();

  const [newName, setNewName] = useState(name || '');
  const [newEmail, setNewEmail] = useState(email || '');
  const [newBirthDate, setNewBirthDate] = useState(birth_date || '');
  const [newAvatar, setNewAvatar] = useState(avatar || '');

  const handleUpdateProfile = async () => {
    const updatedProfile = {
      name: newName,
      email: newEmail,
      birth_date: newBirthDate,
      avatar: newAvatar,
    };

    const response = await fetch('http://localhost:3000/user/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfile),
    });

    if (response.ok) {
      const data = await response.json();
      updateProfile(data.user); // Atualizando o estado global
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      router.push('/profile');
    } else {
      Alert.alert('Erro', 'Não foi possível atualizar o perfil.');
    }
  };

  return (
    <ImageBackground
    source={require('../../assets/background.png')}
    style={styles.background}
  >
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={newName}
        onChangeText={setNewName}
        placeholder="Digite seu nome..."
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={newEmail}
        onChangeText={setNewEmail}
        placeholder="Digite seu email..."
        keyboardType="email-address"
      />
      <Text style={styles.label}>Data de Nascimento:</Text>
      <TextInput
        style={styles.input}
        value={newBirthDate}
        onChangeText={setNewBirthDate}
        placeholder="DD-MM-YYYY"
      />
      <Text style={styles.label}>URL do Avatar:</Text>
      <TextInput
        style={styles.input}
        value={newAvatar}
        onChangeText={setNewAvatar}
        placeholder="Link da imagem do avatar..."
        keyboardType="url"
      />
      <Button onPress={handleUpdateProfile}>Salvar Alterações</Button>
    </View>
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
});
