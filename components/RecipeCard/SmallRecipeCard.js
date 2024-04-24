import React from 'react';
import { Card, Button, IconButton } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/useTheme';
import { useAuth } from '../../context/useAuth';
import Styles from '../../Styles';
import { addToFavorites } from '../favorites';
import { removeFromFavorites } from '../favorites';
import { deleteRecipe } from '../../FirebaseDB/SearchBy';


export default function SmallRecipeCard({ item }) {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleFavorites = () => {
    addToFavorites(user.uid, item.idMeal);
  };

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(user.uid, item.idMeal);
  };

  const handleSeeRecipe = () => {
    navigation.navigate('FullRecipeCard', { itemid: item.idMeal });
  };

  const handleEditRecipe = () => {
    navigation.navigate('FullEditRecipeCard', { itemid: item.idMeal });
  };

  const handleDeleteRecipe = () => {
    deleteRecipe(item.idMeal)
  };

  return (
    <Card style={[styles.container,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
      <Card.Cover source={{ uri: item.strMealThumb }} />
      <Card.Title title={item.strMeal} titleStyle={[styles.title,isDarkMode ? Styles.darkCard : Styles.lightCard]}/>
      <Card.Actions style={styles.actionsContainer}>
        {item.uid === user.uid && user.uid !== undefined && (
           <IconButton
           mode='contained'
           icon={'pencil'}
           iconColor='#FFA500'
           color={'#001219'}
           size={35}
           onPress={handleEditRecipe}
         />

        )}
        {item.uid === user.uid && user.uid !== undefined && (
           <IconButton
           mode='contained'
           icon={'delete'}
           iconColor='#FFA500'
           color={'#001219'}
           size={35}
           onPress={handleDeleteRecipe}
         />

        )}
        {user.uid !== undefined && item.isFavorite ? (
          <IconButton
            icon='star'
            iconColor='#FFA500'
            color={'#001219'}
            size={35}
            onPress={handleRemoveFromFavorites}
          />
        ) : (
          <IconButton
          iconColor='#FFA500'
            icon='star-outline'
            color={'#001219'}
            size={35}
            onPress={handleFavorites}
          />
        )}

        <IconButton
        
          icon='eye'
          iconColor='#FFA500'
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
    width: 320,
    marginBottom: 5,
  },

  editButton: {
    
  },
  actionsContainer: {

  },
  title:{
    fontSize: 20,
  },
});

