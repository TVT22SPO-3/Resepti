import React from 'react';
import { Card, Button, IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/useTheme';
import { useAuth } from '../../context/useAuth';

export default function SmallRecipeCard({ item, addToFavorites, removeFromFavorites }) {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleFavorites = () => {
    if (item.isFavorite) {
      removeFromFavorites(item);
    } else {
      addToFavorites(item);
    }
  };

  const handleSeeRecipe = () => {
    navigation.navigate('FullRecipeCard', { itemid: item.idMeal });
  };

  const handleEditRecipe = () => {
    navigation.navigate('FullEditRecipeCard', { itemid: item.idMeal });
  };

  return (
    <Card style={styles.container}>
      <Card.Cover source={{ uri: item.strMealThumb }} />
      <Card.Title title={item.strMeal} />
      <Card.Actions style={styles.actionsContainer}>
        {item.uid === user.uid && user.uid !== undefined && (
          <Button style={styles.editButton} onPress={handleEditRecipe}>
            Edit
          </Button>
        )}
        <IconButton
          icon={item.isFavorite ? 'star' : 'star-outline'}
          color={'#001219'}
          size={35}
          onPress={handleFavorites}
        />
        <IconButton
          icon='eye'
          color={'#001219'}
          size={35}
          onPress={handleSeeRecipe}
        />

      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
  editButton: {},
  actionsContainer: {

  },
});