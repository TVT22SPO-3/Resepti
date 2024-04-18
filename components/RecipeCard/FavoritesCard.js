import React from 'react';
import { Card, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FavoritesCard({ item, openRecipe, removeFromFavorites, showRemoveButton }) {
    const navigation = useNavigation();
  
    const SeeRecipe = () => {
      navigation.navigate('FullRecipeCard', { itemid: item.idMeal });
    };
  
    const handleRemoveFromFavorites = () => {
      removeFromFavorites(item.id);
    };
  
    return (
      <Card style={styles.container}>
        <Card.Cover source={{ uri: item.strMealThumb }} />
        <Card.Title title={item.strMeal} />
        <Card.Actions>
          {showRemoveButton && (
            <Button onPress={handleRemoveFromFavorites}>Remove </Button>
          )}
          <Button onPress={SeeRecipe}>See recipe!</Button>
        </Card.Actions>
      </Card>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      width: 300,
    },
  });