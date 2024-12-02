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

  const renderNotification = ({ item }) => (
    <View style={styles.notItem}>
      <Image
        style={styles.notIcon}
        source={require('../../../assets/bellATC.png')}
      />
      <View style={styles.notText}>
        <Text style={styles.notTitle}>{item.title}</Text>
        <Text style={styles.notDescr}>{item.description}</Text>
        <Text style={styles.notTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../../assets/background.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Notificações</Text>
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.notificationList}
        />
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
    padding: 20
  },
  header: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 20,
    color: '#DA8C3C',
  },
  notificationList: {
    gap: 15,
    color: '#DA8C3C'
  },
  notItem: {
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
  notIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  notText: {
    flex: 1,
  },
  notTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  notDescr: {
    fontSize: 14,
    color: '#666',
  },
  notTime: {
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
