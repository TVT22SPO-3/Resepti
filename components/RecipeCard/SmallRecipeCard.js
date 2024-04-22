import React from 'react';
import { Card, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from '../../Styles';
import { useTheme } from '../../context/useTheme';

export default function SmallRecipeCard({ item, addToFavorites, removeFromFavorites }) {
  const {isDarkMode} = useTheme()
  const navigation = useNavigation();

  const SeeRecipe = () => {
    navigation.navigate('FullRecipeCard', { itemid: item.idMeal });
  };

  const handleFavorites = () => {
    if (item.isFavorite) {
      removeFromFavorites(item);
    } else {
      addToFavorites(item);
    }
  };

  return (
    <Card style={styles.container}>
      <Card.Cover source={{ uri: item.strMealThumb }} />
      <Card.Title title={item.strMeal} />
      <Card.Actions>
        <Button onPress={handleFavorites}>{item.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Button>
        <Button onPress={SeeRecipe}>See recipe!</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 360,
  },
});