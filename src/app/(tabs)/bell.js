import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

export default function Notifications() {
  const router = useRouter();

  // Exemplo de notificações simuladas
  const notifications = [
    { id: '1', title: 'Nova receita publicada!', description: 'Confira nossa nova receita de bolo de chocolate.', time: '2 min atrás' },
    { id: '2', title: 'Atualização no seu perfil', description: 'Seu perfil foi atualizado com sucesso.', time: '10 min atrás' },
    { id: '3', title: 'Receita favorita atualizada', description: 'Sua receita favorita agora possui novas dicas.', time: '1 hora atrás' },
  ];

  const handleNotificationAction = (id) => {
    Alert.alert(`Ação realizada para a notificação ${id}`);
  };

  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <Image
        style={styles.notificationIcon}
        source={require('../../../assets/bellATC.png')}
      />
      <View style={styles.notificationText}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      <TouchableOpacity onPress={() => handleNotificationAction(item.id)}>
        <Feather name="check-circle" size={24} color="#4CAF50" />
      </TouchableOpacity>
    </View>
  );

  return (
    
      <View style={styles.container}>
        <Text style={styles.header}>Notificações</Text>
        <FlatList

          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationList}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#DA8C3C',
  },
  notificationList: {
    gap: 15,
    color: '#DA8C3C'
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // Alterado para 'cover' para garantir que o fundo cubra toda a tela
    width: '100%',
    height: '100%',
  },
});
