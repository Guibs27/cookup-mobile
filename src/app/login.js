import { ScrollView, StyleSheet, View, TextInput, Alert, Image, ImageBackground, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useLoginStore } from '../stores/useLoginStore';
import { storeObjectData } from '../utils/asyncStorage';
import { inputStyle } from '../components/InputText'
import Button from '../components/Button';

export default function Login() {
  const router = useRouter();
  const { login: loginStore } = useLoginStore();
  const [txtEmail, setTxtEmail] = useState('');
  const [txtPass, setTxtPass] = useState('');

  const handleLogin = async () => {
    const login = {
      email: txtEmail,
      pass: txtPass
    };

    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(login)
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      loginStore({ accessToken: data?.accessToken, ...data.user });
      await storeObjectData('userLogged', { accessToken: data?.accessToken, ...data.user });
      router.push('/home');
    } else {
      const data = await response.json();
      Alert.alert('Erro ao logar');
      console.log(data?.error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo.png')}
        />

        <TextInput
          placeholder="E-mail"
          placeholderTextColor="#AFAFAF"
          placeholderBack="#AFAFAF"
          style={inputStyle.input}
          onChangeText={setTxtEmail}
          value={txtEmail}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#AFAFAF"
          placeholderBack="#AFAFAF"
          style={inputStyle.input}
          onChangeText={setTxtPass}
          value={txtPass}
          secureTextEntry={true}
        />

        <Text style={styles.esqsenha}>Esqueceu a senha?</Text>

        <Button onPress={handleLogin}>Entrar</Button>
        <Button onPress={() => router.push('/signup')}>Cadastre-se</Button>

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
    height: 'auto'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 35,
  },
  esqsenha: {
    fontSize: '15px',
    marginVertical: 10,
    // fontWeight: '...',
    fontFamily: 'Helvetica, sans-serif',
    color: '#DA8C3C'
  },
  alt_login: {
    // color: '#DA8C3C',
    fontSize: 20,
    fontFamily: 'Helvetica, sans-serif',
    marginVertical: 10,
    alignSelf: 'center'
  },
  logo: {
    width: 250,
    height: 80,
    marginBottom: '20px',
    alignSelf: 'center'
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 55,
    height: 54,
    marginHorizontal: 10,
    borderRadius: 25,
  },
});

