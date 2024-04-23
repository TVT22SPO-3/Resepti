import { View, Text, FlatList, StyleSheet, Pressable, SectionList, ScrollView, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import SearchBar from './SearchBar'
import { useNavigation, useRoute } from '@react-navigation/native'
import SmallRecipeCard from '../RecipeCard/SmallRecipeCard'
import { Button, Chip } from 'react-native-paper'
import { SearchByArea, SearchByIngredient, SearchByName, SearchByCategories} from '../../FirebaseDB/SearchBy'
import { fetchMealByName, fetchMealsByArea, fetchMealsByCategory, fetchMealsByMainIngredient } from '../TheMealDB/SearchBy'
import { fetchUserFavorites, addToFavorites, removeFromFavorites, updateMealFavoriteStatus } from '../favorites';


export default function SearchPage() {

  const route = useRoute()
  const { SearchTerm } = route.params || {}
  const [datafbName, setDataFbName] = useState([])
  const [dataIngr, setDataIngr] = useState([])
  const [dataName, setDataName] = useState([])
  const [dataCategory, setDataCategory] = useState([])
  const [dataArea, setDataArea] = useState([])
  const [dataMainIngre, setDataMainIngre] = useState([])
  const [dataAreaFB, setDataAreaFB] = useState([])
  const [dataCategoryFB, setDataCategoryFB] = useState([])
  const [showSearch, setShowSearch] = useState(false);
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
    if(!SearchTerm) return
    const Search = async () => {
      
      console.log("SearchTerm", SearchTerm)
      try {
        const categoryFB = await SearchByCategories(SearchTerm)
        console.log("Firebase Category", categoryFB)
        const areaFB = await SearchByArea(SearchTerm)
        console.log("Firebase Area", areaFB)
        const MainIngre = await fetchMealsByMainIngredient(SearchTerm)
        console.log("Main ingredient", MainIngre)
        const area = await fetchMealsByArea(SearchTerm)
        console.log("area", area)
        const name = await SearchByName(SearchTerm)
        console.log("SearchbarData", name)
        const Ingr = await SearchByIngredient(SearchTerm)
        console.log("SearchDataIngr", Ingr)
        const name2 = await fetchMealByName(SearchTerm)
        console.log("dataName", name2)
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
        setDataName([...(name || []), ...(name2 || [])]);
        setDataIngr([...(Ingr || []), ...(MainIngre || [])])
        setDataCategory([...(categoryFB || []), ...(category || [])])
        setDataArea([...(areaFB || []), ...(area || [])])
        
      } catch (error) {

        console.log("SearchBarError", error)
      }
    }
    Search()

  }, [SearchTerm])


  const title = [
    {
      title: 'Name',
      data: dataName
    },
    
    {
      title: 'Ingredient',
      data: dataIngr
    },
    
    {
      title: 'Category',
      data: dataCategory
    },
    
    {
      title: 'Area',
      data: dataArea
    },
    
    
  ]

 
  //  console.log("SearchPage", SearchData)
  return (
 
    <View style={styles.container1}>
      <View style={styles.containerExp}>
        <SearchBar />
      </View>

      <View style={styles.buttonContainer}>
        {title.map((section, index) => (
          section.data && section.data.length > 0 &&(
          <Chip key={index} onPress={() => ScrollToSection(index)}>{section.title} ({section.data.length})</Chip>
        )))}
        </View>
        <View style={styles.container}>

          <SectionList
          ref={sectionRef}
            sections={title}
            keyExtractor={(item, index) => item.idMeal + index}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <SmallRecipeCard item={item} />
              </View>
            )}
            renderSectionHeader={({ section: { title, data } }) => (
              data && data.length > 0 && (
                <View>
                  <Text style={styles.section}>{title} ({data.length})</Text>
                </View>
              )
            )}
          />
        </View>

      
    </View>


  )
}

const styles = StyleSheet.create({
  section:{
    paddingVertical: 24,
    fontSize: 24,
    
  },
  containerExp: {
    paddingVertical: 8,
    alignItems: 'center',

    marginHorizontal: 12,
  },
  container: {
    flex: 1,
    paddingTop: 8,
    alignItems: 'center',
    width:'100%',
  },
  container1: {
    width:'100%',
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  itemContainer: {
    flex: 1,
    marginBottom: 8, 
    alignSelf: 'stretch',
  },

}) 