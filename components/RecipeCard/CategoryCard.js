import React, { useState } from 'react';
import { Card, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from '../../Styles';
import { useTheme } from '../../context/useTheme';

export default function CategoryCard({ item }) {
  const {isDarkMode} = useTheme()
  const navigation = useNavigation();
  const [SearchTerm, setSearchTerm] = useState('')

    const SeeCategory = () => {
        console.log("Search", item.strCategory)
        navigation.navigate('SearchPage', { SearchData: item.strCategory })
    }

  return (
    <Card style={styles.container}>
      <Card.Cover source={{ uri: item.strCategoryThumb }} />
      <Card.Title title={item.strCategory} />
      <Card.Actions>
        <Button onPress={SeeCategory}>Seach recipes by this Category !!!</Button>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
});