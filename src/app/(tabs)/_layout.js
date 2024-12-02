import Feather from '@expo/vector-icons/Feather';
import { Tabs, useRouter } from 'expo-router';
import { useLoginStore } from '../../stores/useLoginStore';
import { StyleSheet, Image } from 'react-native';

export default function TabLayout() {
  const { avatar } = useLoginStore();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.bar
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Feather name='home' size={28} color={'#fff'} />
          ),
        }}
      />

      <Tabs.Screen
        name="create-recipe"
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Feather name='plus' size={34} color={'#fff'} style={styles.icons} />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Feather name='bell' size={28} color={'#fff'} style={styles.icons} />
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
