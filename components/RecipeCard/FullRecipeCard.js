import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, DataTable } from 'react-native-paper'
import { useNavigation, useNavigationState, useRoute } from '@react-navigation/native'
import { fetchMealById } from '../TheMealDB/SearchBy'
import { SearchByDocId } from '../../FirebaseDB/SearchBy'
import { useTheme } from '../../context/useTheme'
import Styles from '../../Styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FullRecipeCard() {

  const navigation = useNavigationState(state => state.routes[state.index].state)
  const route = useRoute()
  const { itemid } = route.params
  const [recipe2, setrecipe2] = useState("")
  const [recipeFB, setrecipeFB] = useState("")
  console.log("Recipe", itemid)
  const recipe = {}
  const [ingreArray, setingreArray] = useState([])
  const [measureArray, setmeasureArray] = useState([])
  const [show, setShow] = useState(false)
  const [showInst, setshowInst] = useState(false)
  const [tagArray, setTagArray] = useState([])
  const {isDarkMode} = useTheme()




  const toggleAccordion = () => {
    setShow(!show)
    console.log("show:", show)
  }
  const accordionInst = () => {
    setshowInst(!showInst)
    console.log("show:", showInst)
    console.log(recipe2)
  }

  useEffect(() => {
    const getRecipe = async () => {
      console.log(itemid)
      if (itemid.length < 10) {
        try {
          const fetchMeal = await fetchMealById(itemid)
          console.log("fetchMeal:", fetchMeal)
          fetchMeal.username = "TheMealDB"
          fetchMeal.date = ""
          setrecipe2(fetchMeal)
          console.log("recipe2:", recipe2)
        } catch (error) {
          console.log("errorGetmeal", error)
        }

      }
      else {
        try {
          const DocById = await SearchByDocId(itemid)
          console.log("GetDoc", DocById)
          setrecipe2(DocById)
        } catch (error) {
          console.log("errorGetMealFB", error)
        }

      }

    }
getRecipe()
  }, [])

  useEffect(() => {
    const newingreArray = []
    const newmeasureArray = []


    for (let i = 1; i <= 20; i++) {
      const ingreKey = `strIngredient${i}`;
      const measKey = `strMeasure${i}`;

      if (recipe2.hasOwnProperty(ingreKey) && recipe2[ingreKey] !== null && recipe2[ingreKey].trim() !== '') {
        newingreArray.push(recipe2[ingreKey])
      }
      if (recipe2.hasOwnProperty(measKey) && recipe2[measKey] !== null && recipe2[measKey].trim() !== '') {
        newmeasureArray.push(recipe2[measKey])
      }

    }

    const tag = () => {

      if (typeof recipe2.strTags === "string") {
        const text = recipe2.strTags;
        console.log("text:", text);

        const tagArray2 = text.split(",");
        console.log("tagArray:", tagArray2);
        setTagArray(tagArray2)
      } else {
        console.log("Not a String");
      }
    }
    tag()
    setingreArray(newingreArray)
    setmeasureArray(newmeasureArray)
    console.log("ar", ingreArray)
    console.log("mr", measureArray)

  }, [recipe2])




  return (
    <ScrollView style={isDarkMode ? Styles.dark : Styles.light}>
      <View style={[styles.container,isDarkMode ? Styles.dark : Styles.light]}>
        <Card style={[styles.cardContainer, isDarkMode ? Styles.darkCard : Styles.lightCard]}>
          {recipe2 && <Card.Cover resizeMethod="auto" source={{ uri: recipe2.strMealThumb }} />}
        </Card>

        <Card style={[styles.cardContainer, isDarkMode ? Styles.darkCard : Styles.lightCard]}>
          <View style={styles.cardContainer2}>
            <View style={styles.container2}>
              <Text style={[styles.texti, isDarkMode ? Styles.darkCard : Styles.lightCard]}> {recipe2.username}</Text>
            </View>
            <View style={styles.container2}>
              <Text style={[styles.texti, isDarkMode ? Styles.darkCard : Styles.lightCard]}>{recipe2.date}</Text>
            </View>
          </View>
        </Card>

        <Card style={[styles.cardContainer, isDarkMode ? Styles.darkCard : Styles.lightCard]}>
          <View style={styles.cardContainer2}>
            <View style={styles.container2}>
              <Text style={[styles.texti, isDarkMode ? Styles.darkCard : Styles.lightCard]}>{recipe2.strCategory}</Text>
            </View>
            <View style={styles.container2}>
              <Text style={[styles.texti, isDarkMode ? Styles.darkCard : Styles.lightCard]}>{recipe2.strArea}</Text>
            </View>

          </View>
        </Card>
        {tagArray.length > 0 && (
          <Card style={[styles.cardContainer, isDarkMode ? Styles.darkCard : Styles.lightCard]}>
            <View style={[styles.cardContainer2, isDarkMode ? Styles.darkCard : Styles.lightCard]}>
              {
                tagArray.map((tag, index) => (

                  <View key={index} style={[styles.container2, isDarkMode ? Styles.darkCard : Styles.lightCard]}>
                    <Text style={[styles.texti, isDarkMode ? Styles.darkCard : Styles.lightCard]}>{tag}</Text>
                  </View>
                ))
              }
            </View>
          </Card>
        )}
        <Card style={[styles.cardContainer, isDarkMode ? Styles.darkCard : Styles.lightCard]}>
          <DataTable >
            <Pressable onPress={toggleAccordion}>
              <DataTable.Header>
                <DataTable.Title textStyle={isDarkMode ? Styles.darkCard : Styles.lightCard}>Ingredients</DataTable.Title>
                {show ? 
                  <MaterialCommunityIcons name="chevron-up" color={'black'} size={40} /> 
                  : 
                  <MaterialCommunityIcons name="chevron-down" color={'black'} size={40} />  
				        }
                <DataTable.Title textStyle={isDarkMode ? Styles.darkCard : Styles.lightCard} numeric>Measure</DataTable.Title>

              </DataTable.Header>
            </Pressable>
            {show && (
              <View >
                {
                  ingreArray.map((ingredient, index) => (

                    <DataTable.Row  key={index}>
                      <DataTable.Cell textStyle={isDarkMode ? Styles.darkCard : Styles.lightCard}>{ingredient}</DataTable.Cell>
                      <DataTable.Cell textStyle={isDarkMode ? Styles.darkCard : Styles.lightCard} numeric>{measureArray[index]}</DataTable.Cell>
                    </DataTable.Row>
                  ))
                }
              </View>
            )}
          </DataTable>
        </Card>
        <Pressable onPress={accordionInst}>
          <Card style={[styles.cardContainer, isDarkMode ? Styles.darkCard : Styles.lightCard]}>
            <View style={[styles.cardContainer3, isDarkMode ? Styles.darkCard : Styles.lightCard]}>
              <Text style={[styles.texti, isDarkMode ? Styles.darkCard : Styles.lightCard]}>Show instructions</Text>
              {showInst ? 
                <MaterialCommunityIcons name="chevron-up" color={'black'} size={40} /> 
                : 
                <MaterialCommunityIcons name="chevron-down" color={'black'} size={40} />  
				      }
            </View>
            {showInst && (
              <View style={[styles.cardContainer, isDarkMode ? Styles.darkCard : Styles.lightCard]}>

                <Text style={[styles.text2, isDarkMode ? Styles.darkCard : Styles.lightCard]}>{recipe2.strInstructions}</Text>

              </View>
            )}
          </Card>
        </Pressable>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 1,
    alignItems: 'center'
  },
  cardContainer: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  cardContainer3: {
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 8,
  },
  cardContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginVertical: 8,


  },
  texti: {
    fontSize: 16,
    textAlign: 'center'
  },
  text2: {
    fontSize: 16,
  }
})