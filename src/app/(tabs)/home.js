import { ScrollView, StyleSheet } from 'react-native';
import Header from '../../components/Header';
import Content from '../../components/Content';
import Footer from '../../components/Footer';
import { ImageBackground } from 'react-native-web';


export default function Home() {
  return (
    <ImageBackground
      source={require('../../../assets/background.png')}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        <Header />
        <Content />
        {/* <Footer /> */}
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'center',
    width: 'auto',
    height: 'auto'
  },
  container: {
    flex: 1
  },
})