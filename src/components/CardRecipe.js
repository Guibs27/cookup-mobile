import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

export default function CardRecipe({ id, title, comment, recipe_image }) {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push({ pathname: '/show-recipe', params: { id } })}>
      <View style={styles.card}>
        <Image style={styles.recipeImage} source={recipe_image} />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.comment}>{comment}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 14,
    marginHorizontal: 10,
    borderStyle: 'solid',
    borderColor: '#ffefdf',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ffefdf',
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
    marginBottom: 4,
    color: '#333'
  },
  comment: {
    fontSize: 14,
    color: '#977b57',
    marginBottom: 1,
  }
});