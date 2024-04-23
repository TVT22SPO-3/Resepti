import React, { useState } from 'react';
import { Card, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from '../../Styles';
import { useTheme } from '../../context/useTheme';
import { fetchMealByCategory } from '../TheMealDB/SearchBy';

export default function CategoryCard({ item }) {
  const {isDarkMode} = useTheme()
  const navigation = useNavigation();
  const [SearchTerm, setSearchTerm] = useState('')

    const SeeCategory = async () => {
        console.log("Search", item.strCategory)
        const SearchTerm = item.strCategory
        
        try {
          console.log("category:", SearchTerm)
          const dataCategory = await fetchMealByCategory(SearchTerm)
          console.log("SearchDataCategory", dataCategory)
          navigation.navigate('SearchPage', { SearchTerm: SearchTerm })

      } catch (error) {

          console.log("CategoryCard error",error)
      }
    }

  return (
    <Card style={styles.container}>
      <Card.Cover source={{ uri: item.strCategoryThumb }} />
      <Card.Title title={item.strCategory} />
      <Card.Actions>
        <Button style={styles.button} onPress={SeeCategory}>Search recipes by this Category!</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
  button: {
    width: '100%',
  }
});