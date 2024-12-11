import { View, StyleSheet, Text, TextInput, ImageBackground, Alert } from 'react-native';
import { useState } from 'react';
import { useLoginStore } from '../stores/useLoginStore';
import { useRouter } from 'expo-router';
import { inputStyle } from '../components/InputText';
import BackButton from '../components/BackButton';
import Button from '../components/Button';
import { fetchAuth } from '../utils/fetchAuth';

const formatDate = (text) => {
  const cleaned = text.replace(/\D/g, '');

  let formatted = cleaned;
  if (cleaned.length >= 3) {
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  }
  if (cleaned.length >= 5) {
    formatted = `${formatted}/${cleaned.slice(4, 8)}`;
  }

  return formatted;
};

export default function UpdateUser() {
  const { public_id, name, email, birth_date, avatar, login } = useLoginStore();
  const router = useRouter();

  const [newName, setNewName] = useState(name || '');
  const [newEmail, setNewEmail] = useState(email || '');
  const [newBirthDate, setNewBirthDate] = useState(birth_date ? formatDate(birth_date) : ''); // Formatar a data no mesmo estilo
  const [newAvatar, setNewAvatar] = useState(avatar || '');

  const handleUpdateProfile = async () => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dateRegex.test(newBirthDate)) {
      Alert.alert('Erro', 'Por favor, insira uma data válida no formato dd/mm/yyyy.');
      return;
    }

    const [day, month, year] = newBirthDate.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    const updatedProfile = {
      name: newName,
      email: newEmail,
      birth_date: formattedDate,
      avatar: newAvatar,
    };

    try {
      const response = await fetchAuth(`http://localhost:3000/user/${public_id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedProfile),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.user);
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        router.push('/profile');
      } else {
        const errorData = await response.json();
        Alert.alert('Erro', errorData.error || 'Não foi possível atualizar o perfil.');
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      Alert.alert('Erro', 'Erro ao conectar com o servidor.');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.header}>
        <BackButton href="profile" />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Editar Usuário</Text>

        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={inputStyle.input}
          value={newName}
          onChangeText={setNewName}
          placeholder="Digite seu nome..."
          placeholderTextColor="#b8b8b8"
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={inputStyle.input}
          value={newEmail}
          onChangeText={setNewEmail}
          placeholder="Digite seu email..."
          placeholderTextColor="#b8b8b8"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Data de Nascimento:</Text>
        <TextInput
          style={inputStyle.input}
          value={newBirthDate}
          onChangeText={(text) => setNewBirthDate(formatDate(text))} // Usar a mesma função de formatação
          placeholder="DD/MM/YYYY"
          placeholderTextColor="#b8b8b8"
          keyboardType="numeric"
          maxLength={10}
        />

        <Text style={styles.label}>URL do Avatar:</Text>
        <TextInput
          style={inputStyle.input}
          value={newAvatar}
          onChangeText={setNewAvatar}
          placeholder="Link da imagem do avatar..."
          placeholderTextColor="#b8b8b8"
          keyboardType="url"
        />

        <View style={styles.buttonArea}>
          <Button onPress={handleUpdateProfile}>Salvar Alterações</Button>
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
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  label: {
    fontSize: 17.5,
    color: '#DA8C3C',
    marginBottom: 5,
    marginTop: 8,
  },
  buttonArea: {
    marginTop: 10,
  },
});