import { View, StyleSheet, Text, Alert, ImageBackground } from 'react-native';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import Button from '../../components/Button';
import { useLoginStore } from '../../stores/useLoginStore';
import { useRouter } from 'expo-router';
import { deleteObjectData } from '../../utils/asyncStorage';
// import { inputStyle } from '../components/InputText';

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
      <View>
        <View style={styles.container}>
          <Link href="home">
            <Image
              style={styles.cook_icon}
              source={require('../../../assets/cookie-icon.png')}
            />
          </Link>
          <View style={styles.cont1}>
            <Image
              style={styles.avatar}
              source={avatar} //Local
            />
            <Text style={styles.name}>{name}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.emaildate}>email:</Text>
            <Text style={styles.email}>{email}</Text>
            <Text style={styles.emaildate}>Data de nascimento:</Text>
            <Text style={styles.birthDate}>{birth_date}</Text>
            <Button onPress={null}>Editar Perfil</Button>
            <Button onPress={handleLogout}>Logout</Button>
          </View>
        </View>
      </View>
    </ImageBackground >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    display: 'flex',

  },
  cook_icon: {
    width: 55,
    height: 40,
    marginLeft: 5,
    marginTop: 10,

  },
  emaildate: {
    fontSize: 20,
  },
  background: {
    flex: 1,
    resizeMode: 'center',
    width: 'auto',
    height: 'auto'
  },
  cont1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  info: {
    display: 'flex',
    fontSize: '20px',
    alignItems: 'flex-start',
    margin: 20,
  },
  email: {
    borderWidth: 1,
    color: '#00000',
    borderStyle: 'none',
    // borderColor: '#5e5e5e',
    backgroundColor: '#EDEAEA',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 5,
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
    display: 'flex'
  },
  name: {
    fontSize: 25,
    fontWeight: '600',
    display: 'flex',
    marginLeft: 20,
    marginTop: 15,
  },
  birthDate: {
    borderWidth: 1,
    color: '#00000',
    borderStyle: 'none',
    // borderColor: '#5e5e5e',
    backgroundColor: '#EDEAEA',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 5,
  },

});
