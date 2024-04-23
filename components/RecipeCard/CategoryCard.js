import React, { useState } from 'react';
import { Card, Button, IconButton } from 'react-native-paper';
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
    <Card style={[styles.container,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
      <Card.Cover source={{ uri: item.strCategoryThumb }} />
      <Card.Title titleStyle={[styles.title,isDarkMode ? Styles.darkCard : Styles.lightCard]} title={item.strCategory} />
      <Card.Actions>
        <IconButton
            icon='magnify'
            size={35} 
            color={'#001219'}
            onPress={SeeCategory}
            disabled={false}/>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
  title:{
    fontSize:22,
  },
});