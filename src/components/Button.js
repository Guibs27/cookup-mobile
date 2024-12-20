import { Pressable, StyleSheet, Text } from "react-native";

export default function Button({ onPress, children }) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: ({ pressed }) => [{
    backgroundColor: pressed ? '#C26C2D' : '#DA8C3C',
    alignItems: 'center',
    marginVertical: 4.5,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 30,
  }],
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: "600",
  },
});