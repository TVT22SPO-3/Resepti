import { View, Text, FlatList } from 'react-native'
import React from 'react'
import SearchBar from './SearchBar'
import { useNavigation, useRoute } from '@react-navigation/native'
import SmallRecipeCard from '../RecipeCard/SmallRecipeCard'


export default function SearchPage() {
    const route = useRoute()
    const { SearchData } = route.params
    
    console.log("SearchPage", SearchData)
  return (
    <View>
      <View>
        <SearchBar/>
      </View>
      <View>
        <Text></Text>
        
     <FlatList
          data={SearchData}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <SmallRecipeCard item={item}/>
        )}
        />
    
    </View>
      </View>
    

  )
}