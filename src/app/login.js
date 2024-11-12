import { ScrollView, StyleSheet, View, TextInput, Alert, Image, ImageBackground, Text } from 'react-native';
import Button from '../components/Button';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useLoginStore } from '../stores/useLoginStore';
import { storeObjectData } from '../utils/asyncStorage';

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
      source={require('../../assets/background.png')} // Substitua pelo caminho correto
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerContainer}>


          <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}
          />


          <TextInput
            placeholder="Digite seu email:"
            placeholderTextColor="#AFAFAF"
            placeholderBack="#AFAFAF"
            style={styles.input}
            onChangeText={setTxtEmail}
            value={txtEmail}
          />

          <TextInput
            placeholder="Digite sua senha:"
            placeholderTextColor="#AFAFAF"
            placeholderBack="#AFAFAF"
            style={styles.input}
            onChangeText={setTxtPass}
            value={txtPass}
            secureTextEntry={true}
          />

          <p style={styles.esqsenha}>Esqueceu a senha?</p>

          <Button onPress={handleLogin}>Entrar</Button>
          <Button onPress={() => router.push('/signup')}>Cadastre-se</Button>

          <Text style={styles.text}>ou</Text>

          <View style={styles.options}>
            <Image
              style={styles.image}
              source={{ uri: 'https://static-00.iconduck.com/assets.00/google-icon-2048x2048-pks9lbdv.png' }}
            />
            <Image
              style={styles.image}
              source={{ uri: 'https://cdn-icons-png.flaticon.com/256/124/124010.png' }}
            />
            <Image
              style={styles.image}
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png' }}
            />
          </View>
        </View>
      </ScrollView>
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
  esqsenha: {
    fontSize: '15px',
    color: '#DA8C3C'
  },
  logo: {
    width: '200px',
    height: '50px',
    marginBottom: '20px',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  innerContainer: {
    flex: 2,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#841C94',
    marginVertical: 10,

  },
  options: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
    borderRadius: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#444444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 5,
    borderRadius: 5,
    width: '90%',
    backgroundColor: '#EDEAEA',
  },
  divisor: {
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    width: '90%',
    marginVertical: 50,
  },
});

