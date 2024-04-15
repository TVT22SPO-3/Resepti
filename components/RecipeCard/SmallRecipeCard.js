import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { Card, Button } from 'react-native-paper'
import FullRecipeCard from './FullRecipeCard'
import {useNavigation} from '@react-navigation/native'

export default function SmallRecipeCard({ item }) {
const navigation = useNavigation()

  const SeeRecipe = () =>{
    navigation.navigate('FullRecipeCard', {itemid: item.idMeal})

  }

  console.log("item", item)
  return (
    <Card style={styles.container}>
      <Card.Cover source={{ uri: item.strMealThumb }} />
      <Card.Title title={item.strMeal} />
      <Card.Actions>
        <Button>Favorites</Button>
        <Button onPress={SeeRecipe}>See recipe!</Button>
      </Card.Actions>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300
  },
})