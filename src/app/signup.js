import { View, StyleSheet, Text, TextInput, Alert, Image, ImageBackground } from 'react-native'
import { useState } from "react"
import { useRouter } from 'expo-router'
import { Link } from 'expo-router'
import Feather from '@expo/vector-icons/Feather'
import { inputStyle } from '../components/InputText'
import Button from '../components/Button'

export default function SignUp() {
  const router = useRouter()
  const [txtName, setTxtName] = useState('')
  const [txtEmail, setTxtEmail] = useState('')
  const [txtAvatar, setTxtAvatar] = useState('')
  const [txtPass, setTxtPass] = useState('')

  const handleCreateAccount = async () => {
    const user = {
      name: txtName,
      email: txtEmail,
      avatar: txtAvatar,
      pass: txtPass,
    }

    const response = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    if (response.ok) {
      const data = await response.json()
      Alert.alert('Usuário Criado com Sucesso!')
      setTxtName('')
      setTxtEmail('')
      setTxtAvatar('')
      setTxtPass('')
      router.back()
    } else {
      const data = await response.json()
      Alert.alert('Erro ao Criar Usuário')
      console.log(data?.error)
    }
    return
  }

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.content}>
      <Link href="login">
        <Feather style={styles.menu} name="arrow-left" size={35} color="black" />
      </Link>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}
          />
        </View>

        <TextInput
          style={inputStyle.input}
          onChangeText={setTxtName}
          value={txtName}
          placeholder='Nome de usuário'
          placeholderTextColor='#b8b8b8'
        />

        <TextInput
          style={inputStyle.input}
          onChangeText={setTxtEmail}
          value={txtEmail}
          placeholder='E-mail'
          placeholderTextColor='#b8b8b8'
        />

        <TextInput
          style={inputStyle.input}
          onChangeText={setTxtAvatar}
          value={txtAvatar}
          keyboardType='url'
          placeholder='Avatar URL'
          placeholderTextColor='#b8b8b8'
        />

        <TextInput
          style={inputStyle.input}
          onChangeText={setTxtPass}
          value={txtPass}
          secureTextEntry={true}
          placeholder='Senha'
          placeholderTextColor='#b8b8b8'
        />
        <Button onPress={handleCreateAccount}>Cadastrar</Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 15
  },
  header: {
    alignItems: 'center',
    marginTop: 150
  },
  logo: {
    width: '250px',
    height: '80px',
    marginBottom: '20px'
  },
  background: {
    flex: 1,
    resizeMode: 'center',
    width: 'auto',
    height: 'auto'
  }
})