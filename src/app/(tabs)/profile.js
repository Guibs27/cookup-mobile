import { View, StyleSheet, Text, Alert, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { useLoginStore } from '../../stores/useLoginStore';
import { deleteObjectData } from '../../utils/asyncStorage';
import { inputStyle } from '../../components/InputText';
import Button from '../../components/Button';

export default function Profile() {
  const { avatar, name, birth_date, email } = useLoginStore(); // Chamando birth_date
  const { logout: logoutStore, accessToken } = useLoginStore();
  const router = useRouter();

  const handleLogout = async () => {
    const logout = {
      accessToken,
    };

    const response = await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logout),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      logoutStore();
      await deleteObjectData('userLogged');
      router.replace('/login');
    } else {
      const data = await response.json();
      Alert.alert('Erro ao logar');
      console.log(data?.error);
    }
    return;
  };

  return (
    <ImageBackground
      source={require('../../../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.container}>

        <View style={styles.main}>
          <Image
            style={styles.avatar}
            source={avatar}
          />
          <Text style={styles.name}>{name}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.label}>Email:</Text>
          <Text style={inputStyle.input}>{email}</Text>

          <Text style={styles.label}>Data de nascimento:</Text>
          <Text style={inputStyle.input}>{birth_date}</Text>

          <View style={styles.buttons}>
            <Button onPress={() => router.push({ pathname: '/update-user' })}>Editar Perfil</Button>
            <Button onPress={handleLogout}>Logout</Button>
          </View>
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
    gap: 30,
    padding: 5
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 100
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 80,
    borderColor: '#96570F',
    borderStyle: 'solid',
    borderWidth: 1,
    marginLeft: '20px',
    marginTop: '20px'
  },
  name: {
    fontSize: 25,
    fontWeight: '600',
    color: '#96570F',
    marginLeft: 20,
    marginTop: 15
  },
  info: {
    justifyContent: 'center',
    alignContent: 'center',
    margin: 20
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    color: '#DA8C3C',
    marginBottom: 5,
    marginTop: 8,
  },
  buttons: {
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 15
  }
});