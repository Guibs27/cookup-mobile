import Feather from '@expo/vector-icons/Feather';
import { Tabs, useRouter } from 'expo-router';
import { useLoginStore } from '../../stores/useLoginStore';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function TabLayout() {
  const { avatar } = useLoginStore();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.bar,
      }}
    >
       <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Image style={styles.bell} source={require('../../../assets/bell.png')} />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                // Intercepta o clique e não faz nada
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create-account"
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Image style={styles.plus} source={require('../../../assets/plus.png')} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Image style={styles.avatar} source={avatar} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  plus: {
    width: 35,
    height: 35,
  },
  bell: {
    width: 35,
    height: 35,
  },
  bar: {
    backgroundColor: '#DA8C3C',
  },
});
