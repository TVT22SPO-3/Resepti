import { View, Text, FlatList, StyleSheet, Pressable, SectionList, ScrollView, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import SearchBar from './SearchBar'
import { useNavigation, useRoute } from '@react-navigation/native'
import SmallRecipeCard from '../RecipeCard/SmallRecipeCard'
import { Button, Chip } from 'react-native-paper'
import { SearchByIngredient, SearchByName } from '../../FirebaseDB/SearchBy'
import { fetchMealByName, fetchMealsByArea, fetchMealsByCategory, fetchMealsByMainIngredient } from '../TheMealDB/SearchBy'



export default function SearchPage() {

  const route = useRoute()
  const { SearchTerm } = route.params
  const [datafbName, setDataFbName] = useState([]);
  const [dataIngr, setDataIngr] = useState([]);
  const [dataName, setDataName] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataArea, setDataArea] = useState([]);
  const [dataMainIngre, setDataMainIngre] = useState([]);
  const sectionRef = useRef(0) 

  const ScrollToSection = (index)  => {
    console.log(index)
    sectionRef.current.scrollToLocation({
      animated:true,
      sectionIndex: index,
      itemIndex: 0,
    })
     
  }

  useEffect(() => {

    const Search = async () => {
      
      console.log("SearchTerm", SearchTerm)
      try {
        const MainIngre = await fetchMealsByMainIngredient(SearchTerm)
        console.log("Main ingredient", MainIngre)
        const area = await fetchMealsByArea(SearchTerm)
        console.log("area", area)
        const name = await SearchByName(SearchTerm)
        console.log("SearchbarData", datafbName)
        const Ingr = await SearchByIngredient(SearchTerm)
        console.log("SearchDataIngr", dataIngr)
        const name2 = await fetchMealByName(SearchTerm)
        console.log("dataName", dataName)
        const category = await fetchMealsByCategory(SearchTerm)
        console.log("Category", category)
        console.log("length", datafbName.length, "/", dataIngr.length, "/", dataName.length, "/", dataCategory.length, "/", dataArea.length, "/", dataMainIngre.length)
        console.log("data", datafbName, "/", dataIngr, "/", dataName, "/", dataCategory, "/", dataArea, "/", dataMainIngre)
        /* const newData = []
             .concat(datafbName || [])
             .concat(dataIngr || [])
             .concat(dataName || []);
         setSearchData(prevData => [...prevData, ...newData]);*/


        // setSearchTerm("")
        //  setSearchData([])
        setDataFbName(name || [])
        setDataIngr(Ingr || [])
        setDataName(name2 || [])
        setDataCategory(category || [])
        setDataArea(area || [])
        setDataMainIngre(MainIngre || [] )

      } catch (error) {

        console.log("SearchBarError", error)
      }
    }
    Search()

  }, [SearchTerm])


  const title = [
    {
      title: 'Name',
      data: datafbName
    },
    {
      title: 'Name2',
      data: dataName
    },
    {
      title: 'Ingredient',
      data: dataIngr
    },
    {
      title: 'Main Ingredient',
      data: dataMainIngre
    },
    {
      title: 'Category',
      data: dataCategory
    },
    {
      title: 'Area',
      data: dataArea
    }
  ]




  //  console.log("SearchPage", SearchData)
  return (

    <View>
      <View style={styles.containerExp}>
        <SearchBar />
      </View>

      <View style={styles.buttonContainer}>
        {title.map((section, index) => (
          section.data && section.data.length > 0 &&(
          <Chip key={index} onPress={() => ScrollToSection(index)}>{section.title} ({section.data.length})</Chip>
        )))}
        
        <View style={styles.container}>

          <SectionList
          ref={sectionRef}
            sections={title}
            keyExtractor={(item, index) => item.idMeal + index}
            renderItem={({ item }) => (
              <View style={styles.container1}>
                <SmallRecipeCard item={item} />
              </View>
            )}
            renderSectionHeader={({ section: { title, data } }) => (
              data && data.length > 0 && (
                <View>
                  <Text>{title}</Text>
                </View>
              )
            )}
          />
        </View>

      </View>
    </View>


  )
}

const styles = StyleSheet.create({
  containerExp: {
    paddingVertical: 8,
    alignItems: 'center',

    marginHorizontal: 12,
  },
  container: {
    paddingTop: 8,
    alignItems: 'center',

  },
  container1: {

    paddingVertical: 8,
    alignItems: 'center',

  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  }
})