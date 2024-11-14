import { View, StyleSheet, Text, Alert } from 'react-native'
import { Image } from 'expo-image'
import Button from '../../components/Button'
import { useLoginStore } from '../../stores/useLoginStore'
import { useRouter } from 'expo-router'
import { deleteObjectData } from '../../utils/asyncStorage'

export default function Profile() {

  const { avatar, name } = useLoginStore()
  const { logout: logoutStore, accessToken } = useLoginStore()
  const router = useRouter()

  const handleLogout = async () => {
    const logout = {
      accessToken
    }

    const response = await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logout)
    })

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      logoutStore()
      await deleteObjectData('userLogged')
      router.replace('/login')
    } else {
      const data = await response.json()
      Alert.alert('Erro ao logar')
      console.log(data?.error)
    }
    return
  }

  return (
    <View style={styles.container}>

        <Image
          style={styles.avatar}
          source={avatar} //Local
        //source="https://avatars.githubusercontent.com/u/4259630?v=4"
        />
      
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Button onPress={handleLogout}>Logout</Button>
      </View>
      </View>
  
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    display: 'flex',
  },
  info: {
    display: 'flex',
    fontSize: '20px',
    alignItems: 'center',
  },
  foto: {
    display: 'flex',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 80,
    borderColor: '#DA8C3C',
    borderStyle: 'solid',
    borderWidth: 1,
    marginLeft: '20px',
    marginTop: '20px',
  },
  name: {
    fontSize: 20
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
})