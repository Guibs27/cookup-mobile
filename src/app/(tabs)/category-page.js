import { View, StyleSheet, Text, Alert, ImageBackground, Image } from 'react-native';
// import { Image } from 'expo-image';
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
    return;
  };

  return (
    <ImageBackground
      source={require('../../../assets/background.png')}
      style={styles.background}
    >
      <View>
        <View style={styles.container}>
          <View style={styles.cont1}>
            <Image
              style={styles.logo}
              source={require('../../../assets/logo.png')}
            />
          </View>
          <Text style={styles.txtCategory}>selecione um categoria que deseja explorar:</Text>
          <View  style={styles.GrCategory}>
            <View>
              <Image
                style={styles.Categorys}
                source={require('../../../assets/Vegetariana.png')}
              />
            </View>
            <View>
              <Image
                style={styles.Categorys}
                source={require('../../../assets/Vegetariana.png')}
              />
            </View>
            <View>
            </View>
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
    justifyContent: 'center'
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
  txtCategory: {
    color: '#DA8C3C',
    fontSize: 15,
    justifyContent: 'center',
    marginLeft: 60,
  },
  logo: {
    width: 250,
    height: 80,
    marginBottom: '20px',
    alignSelf: 'center',
    marginLeft: 75,
    marginTop: 35,
  },
  Categorys: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginLeft: 20,
    
  },
  GrCategory: {
    display: 'flex',
    flexDirection: 'row',
    width: 100,
    height: 100,
    
  }
});
