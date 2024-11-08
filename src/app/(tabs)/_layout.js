import Feather from '@expo/vector-icons/Feather'
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'orange', headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <Feather size={30} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="create-account"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <Feather size={32} name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => <Feather size={30} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
