import React, { useState } from 'react';
import { Card, Button, IconButton, Divider } from 'react-native-paper';
import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from '../../Styles';
import { useTheme } from '../../context/useTheme';
import { useAuth } from '../../context/useAuth';


export default function SmallRecipeCard({ item, addToFavorites, removeFromFavorites }) {
  const {isDarkMode} = useTheme()

  const navigation = useNavigation();
  const { user } = useAuth();
  //const [isCurrentUser, setIsCurrentUser] = useState(false);

  console.log('item.uid and user.uid = '+ item.uid + ' ' + user.uid);

  const handleSeeRecipe = () => {
    onSeeRecipe(item.idMeal);
  };

  const handleEditRecipe = () => {
    navigation.navigate('FullEditRecipeCard', { itemid: item.idMeal });
  }

  return (
    <Card style={styles.container}>
      <Card.Cover source={{ uri: item.strMealThumb }} />
      <Card.Title title={item.strMeal} />
      <Card.Actions>
        <Button onPress={() => onPressFavorite(item)}>
          {item.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Button>
        <Button onPress={handleSeeRecipe}>See recipe!</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 360,
  },
});