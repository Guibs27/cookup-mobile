import { Link } from 'expo-router';
import { Image, StyleSheet } from 'react-native';

export default function BackButton({ href }) {
  return (
    <Link href={href}>
      <Image
        style={styles.icon}
        source={require('../../assets/cookie-icon.png')}
      />
    </Link>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 70,
    height: 50,
    marginHorizontal: 5,
    marginVertical: 15
  },
});