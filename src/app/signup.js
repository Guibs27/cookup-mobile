import { View, StyleSheet, Text, TextInput, Alert, Image, ImageBackground } from 'react-native';
import { useState } from "react";
import { useRouter } from 'expo-router';
import BackButton from '../components/BackButton';
import { inputStyle } from '../components/InputText';
import Button from '../components/Button';

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

export default function SignUp() {
  const router = useRouter();
  const [txtName, setTxtName] = useState('');
  const [txtEmail, setTxtEmail] = useState('');
  const [txtAvatar, setTxtAvatar] = useState('');
  const [txtPass, setTxtPass] = useState('');
  const [txtBirthDate, setTxtBirthDate] = useState('');

  const handleCreateAccount = async () => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!dateRegex.test(txtBirthDate)) {
      Alert.alert('Erro', 'Por favor, insira uma data válida no formato dd/mm/yyyy.');
      return;
    }

    const [day, month, year] = txtBirthDate.split('/');
    const formattedDate = `${year}-${month}-${day}`;

    const user = {
      name: txtName,
      email: txtEmail,
      avatar: txtAvatar,
      pass: txtPass,
      birth_date: formattedDate,
    };

    const response = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      const data = await response.json();
      Alert.alert('Usuário Criado com Sucesso!');
      setTxtName('');
      setTxtEmail('');
      setTxtAvatar('');
      setTxtPass('');
      setTxtBirthDate('');
      router.back();
    } else {
      const data = await response.json();
      Alert.alert('Erro ao Criar Usuário');
      console.log(data?.error);
    }
    return;
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.header}>
        <BackButton href="login" />
      </View>

      <View style={styles.content}>
        <View style={styles.header2}>
          <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}
          />
        </View>

        <TextInput
          style={inputStyle.input}
          onChangeText={setTxtName}
          value={txtName}
          placeholder="Nome de usuário"
          placeholderTextColor="#b8b8b8"
        />

        <TextInput
          style={inputStyle.input}
          onChangeText={setTxtEmail}
          value={txtEmail}
          placeholder="E-mail"
          placeholderTextColor="#b8b8b8"
        />

        <TextInput
          style={inputStyle.input}
          onChangeText={setTxtPass}
          value={txtPass}
          secureTextEntry={true}
          placeholder="Senha"
          placeholderTextColor="#b8b8b8"
        />

        <TextInput
          style={inputStyle.input}
          onChangeText={setTxtAvatar}
          value={txtAvatar}
          keyboardType="url"
          placeholder="Avatar URL"
          placeholderTextColor="#b8b8b8"
        />

        <TextInput
          style={inputStyle.input}
          onChangeText={(text) => setTxtBirthDate(formatDate(text))}
          value={txtBirthDate}
          keyboardType="numeric"
          placeholder="Data de nascimento (dd/mm/yyyy)"
          placeholderTextColor="#b8b8b8"
          maxLength={10}
        />

        <View style={styles.buttonArea}>
          <Button onPress={handleCreateAccount}>Cadastrar</Button>
        </View>

        <Text style={styles.alt_login}>ou</Text>

        <View style={styles.options}>
          <Image
            style={styles.image}
            source={require('../../assets/google-logo.png')}
          />
          <Image
            style={styles.image}
            source={require('../../assets/facebook-icon.png')}
          />
          <Image
            style={styles.image}
            source={require('../../assets/instagram-icon.png')}
          />
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
  content: {
    padding: 30,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header2: {
    alignItems: 'center',
    marginTop: 125,
  },
  cook_icon: {
    width: 55,
    height: 40,
    marginLeft: 5,
    marginTop: 10,
  },
  logo: {
    width: 250,
    height: 80,
    marginBottom: 20,
  },
  buttonArea: {
    marginTop: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  image: {
    width: 55,
    height: 54,
    marginHorizontal: 10,
    borderRadius: 25,
  },
  alt_login: {
    fontSize: 20,
    fontFamily: 'Helvetica, sans-serif',
    marginVertical: 20,
    alignSelf: 'center',
  },
});
