import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router'

export default function CardAccount({ id, service, userName, imgUrl }) {
  const router = useRouter()

  return (
    <Pressable onPress={() => router.push({ pathname: '/show-pass', params: { id } })}>
      <View style={styles.card}>
        {/* Imagem principal utilizando imgUrl */}
        <Image style={styles.imgUrl} source={imgUrl} />

        {/* Conteúdo */}
        <View style={styles.content}>
          {/* Service como título */}
          <Text style={styles.service}>{service}</Text>

          {/* userName como subtítulo ou descrição */}
          <Text style={styles.userName}>{userName}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderStyle: 'solid',
    borderColor: '#EEEEEE',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fcfcfc'
  },
  imgUrl: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 10,
  },
  service: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  userName: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
});
