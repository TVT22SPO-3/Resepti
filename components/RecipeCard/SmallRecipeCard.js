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

  const handleEditRecipe = () => {
    navigation.navigate('FullEditRecipeCard', { itemid: item.idMeal });
  }

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
          iconColor={'#001219'}
          size={35}
          onPress={handleFavorites}
        />
        <IconButton
          icon='eye'
          iconColor={'#001219'}
          size={35}
          onPress={SeeRecipe}
        />
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    
  },
  editButton: {
    
  },
  actionsContainer: {
    
  },
});