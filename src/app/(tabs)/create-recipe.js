import { View, StyleSheet, Text, TextInput } from 'react-native'
import { useState } from "react"
import { useRouter } from 'expo-router'
import { useAccountStore } from '../../stores/useAccountStore'
import { fetchAuth } from '../../utils/fetchAuth'
import { inputStyle } from '../../components/InputText';
import Button from '../../components/Button'

export default function CreateAccount() {
  const { addAccount } = useAccountStore()
  const router = useRouter()

  const [txtServico, setTxtServico] = useState('')
  const [txtUsername, setTxtUsername] = useState('')
  const [txtPass, setTxtPass] = useState('')
  const [txtImgUrl, setTxtImgUrl] = useState('')

  const handleCreateAccount = async () => {
    const account = {
      service: txtServico,
      username: txtUsername,
      logo_image: txtImgUrl,
      pass: txtPass
    }

    const response = await fetchAuth('http://localhost:3000/account', {
      method: 'POST',
      body: JSON.stringify(account)
    })

    if (response.ok) {
      const data = await response.json()
      addAccount(data.account)
      router.replace('/home')
      return
    }

    console.log('Erro ao carregar accounts')
    return
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar receita</Text>
      <TextInput
        style={inputStyle.input}
        onChangeText={setTxtServico}
        value={txtServico}
        placeholder='Título'
        placeholderTextColor='gray'
      />

      <TextInput
        style={inputStyle.input}
        onChangeText={setTxtUsername}
        value={txtUsername}
        placeholder='Descrição'
        placeholderTextColor='gray'
      />

      <TextInput
        style={inputStyle.input}
        onChangeText={setTxtPass}
        value={txtPass}
        placeholder='Senha (temporário)'
        placeholderTextColor='gray'
      />

      <TextInput
        style={inputStyle.input}
        onChangeText={setTxtImgUrl}
        value={txtImgUrl}
        placeholder='Imagem da receita'
        placeholderTextColor='gray'
        keyboardType='url'
      />
      <Button onPress={handleCreateAccount}>Adicionar</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 25,
    color: '#DA8C3C',
    marginBottom: 10,
    // textAlign: 'center'
  }
})