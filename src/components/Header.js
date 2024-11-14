import { View, Text, StyleSheet } from 'react-native'
import { Image } from 'expo-image'
import Feather from '@expo/vector-icons/Feather'
import { Link } from 'expo-router'
import { useLoginStore } from '../stores/useLoginStore'

export default function Header() {

  const { name, avatar } = useLoginStore()

  return (
    <View style={styles.header}>
      <View style={styles.user}>
    
        <Image
          style={styles.logo}
          source={require('../../assets/logo.png')}
        />

      </View>
      <Feather name='menu' size={24} color='#DA8C3C' style={styles.menu} />
      <View style={styles.divisor} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    ackgroundColor: "#FAF6F2",
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: '200px',
    height: '50px',
  },
  menu: {

  },
  // user: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   gap: 10
  // },
  name: {
    fontWeight: '600',
    fontSize: 18
  },
  menu: {
    padding: 5
  },
  divisor: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    right: 15,
    height: 1,
    backgroundColor: '#DA8C3C',
  },
})