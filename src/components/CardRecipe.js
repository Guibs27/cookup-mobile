import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function CardRecipe({ id, title, ingredients, recipe_image }) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push({ pathname: '/show-pass', params: { id } })}>
      <View style={styles.card}>
        <Image style={styles.recipeImage} source={recipe_image} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.ingredients}>{ingredients}</Text>
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
    backgroundColor: '#fcfcfc',
  },
  recipeImage: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  ingredients: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
});