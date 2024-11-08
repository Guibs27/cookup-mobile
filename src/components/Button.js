import { Pressable, StyleSheet, Text } from "react-native"

export default function Button({ onPress, children }) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: ({ pressed }) => [{
    backgroundColor: pressed ? '#ed7900' : '#f97f01',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 30
  }],
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: "600"
  }
})