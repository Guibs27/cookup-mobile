import { View, StyleSheet, Text, ImageBackground, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function Profile() {
  const router = useRouter();

  // Objeto com as categorias
  const categories = [
    { id: 1, name: 'Vegetariana', image: require('../../assets/Vegetariana.png') },
    { id: 2, name: 'Pratos quentes', image: require('../../assets/PratosQuentes.png') },
    { id: 3, name: 'Pratos frios', image: require('../../assets/PratosFrios.png') },
    { id: 4, name: 'Salgados', image: require('../../assets/Salgado.png') },
    { id: 5, name: 'Doces', image: require('../../assets/Doces.png') },
    { id: 6, name: 'Couvers', image: require('../../assets/Couveres.png') },
  ];

  return (
    <ImageBackground source={require('../../assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../assets/logo.png')} />
        <Text style={styles.txtCategory}>Selecione uma categoria que deseja explorar:</Text>
        <View style={styles.fullCategory}>
          <View style={styles.GrCategory}>
            {categories.map((category) => (
              <View key={category.id} style={styles.categoryItem}>
                <Link href="home">
                <Image style={styles.Categorys} source={category.image} />
                </Link>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // Contêiner principal centralizado
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // Centraliza o conteúdo dentro do container
    padding: 20,
  },
  // Fundo de tela, com imagem ajustada
  background: {
    flex: 1,
    resizeMode: 'cover', // Alterado para 'cover' para garantir que o fundo cubra toda a tela
    width: '100%',
    height: '100%',
  },
  // Logo
  logo: {
    width: 250,
    height: 80,
    marginBottom: 15,
  },
  // Texto de instrução
  txtCategory: {
    color: '#DA8C3C',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center', // Centraliza o texto
    marginTop: 20,
  },
  // Contêiner das categorias
  fullCategory: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center', // Centraliza as categorias
    marginTop: 20,
  },
  // Grid de categorias com centralização e espaçamento
  GrCategory: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite que as categorias quebrem para a linha seguinte
    justifyContent: 'center', // Centraliza as categorias dentro da linha
    gap: 15, // Espaçamento entre as categorias
    marginTop: 10,
  },
  // Item de categoria com alinhamento central
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Imagem da categoria
  Categorys: {
    width: 150,
    height: 150,
    borderRadius: 20,
    marginBottom: 5,
  },
  // Nome da categoria abaixo da imagem
  categoryName: {
    color: '#DA8C3C',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center', // Centraliza o nome da categoria
  },
});
