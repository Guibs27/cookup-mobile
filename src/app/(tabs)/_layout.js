import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';
import { useLoginStore } from '../../stores/useLoginStore';
import { StyleSheet, Image } from 'react-native';

export default function TabLayout() {
  const { avatar } = useLoginStore();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#be4f00',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#DA8C3C' },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Feather name='home' size={32} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="create-recipe"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Feather name='plus' size={38} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <Feather name='bell' size={30} color={color} style={{ marginTop: 1.5 }} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            // <Image style={styles.avatar} source={avatar} />
            <Feather name='user' size={30} color={color} />
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
  // avatar: {
  //   width: 37,
  //   height: 37,
  //   borderRadius: 25,
  //   marginBottom: 0.2,
  //   borderWidth: 2,
  //   borderColor: '#fff',
  // },
});