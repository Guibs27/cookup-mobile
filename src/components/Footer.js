import { View, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      {/* <Text style={styles.copy}>Copyright © 2024 Cookup.com</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copy: {
    color: "#BBBBBB",
  }
});