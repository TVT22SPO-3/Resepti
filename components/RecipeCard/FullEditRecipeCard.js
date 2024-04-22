import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, DataTable, IconButton, TextInput, Button } from 'react-native-paper'
import { useNavigation, useNavigationState, useRoute } from '@react-navigation/native'
import { fetchMealById } from '../TheMealDB/SearchBy'
import { SearchByDocId } from '../../FirebaseDB/SearchBy'


export default function FullEditRecipeCard() {

  const navigation = useNavigationState(state => state.routes[state.index].state)
  const route = useRoute()
  const { itemid } = route.params
  const [recipe2, setRecipe2] = useState("")
  const [categoryText, setCategoryText] = useState('');
  const [areaText, setAreaText] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [existingIngredients, setExistingIngredients] = useState({ strIngredient: [], strMeasure: [] });
  const [newIngredient, setNewIngredient] = useState({ name: '', measure: '' });

  useEffect(() => {
    const getRecipe = async () => {
      console.log(itemid)
      if (itemid.length < 10) {
        try {
          const fetchMeal = await fetchMealById(itemid)
          console.log("fetchMeal:", fetchMeal)
          fetchMeal.username = "TheMealDB"
          fetchMeal.date = ""
          setRecipe2(fetchMeal)
          const existingIngredientsData = {
            strIngredient: fetchMeal.ingredients,
            strMeasure: Array(fetchMeal.ingredients.length).fill('')
          };
          setExistingIngredients(existingIngredientsData);
          console.log("recipe2:", recipe2)
        } catch (error) {
          console.log("errorGetmeal", error)
        }

      } else {
        try {
          const DocById = await SearchByDocId(itemid)
          console.log("GetDoc", DocById)
          setRecipe2(DocById)
          const existingIngredientsData = {
            strIngredient: DocById.ingredients,
            strMeasure: Array(DocById.ingredients.length).fill('')
          };
          setExistingIngredients(existingIngredientsData);
        } catch (error) {
          console.log("errorGetMealFB", error)
        }
      }
    }
    getRecipe()
  }, [])

  const handleEditCategory = (text) => {
    setCategoryText(text);
    setRecipe2(prevRecipe => ({
      ...prevRecipe,
      strCategory: text
    }));
  }

  const handleEditArea = (text) => {
    setAreaText(text);
    setRecipe2(prevRecipe => ({
      ...prevRecipe,
      strArea: text
    }));
  }

  const handleEditInstructions = (text) => {
    setInstructions(text);
    setRecipe2(prevRecipe => ({
      ...prevRecipe,
      strInstructions: text
    }));
  }

  const handleEditRecipeName = (text) => {
    setRecipeName(text);
    setRecipe2(prevRecipe => ({
      ...prevRecipe,
      strMeal: text
    }));
  }

  const handleSave = () => {
    console.log("Saved changes:", {
      recipeName,
      category: categoryText,
      area: areaText,
      instructions,
      ...existingIngredients
    });
    // Here you can implement logic to save changes, like sending to an API, etc.
  }

  const handleAddIngredient = () => {
    const updatedIngredients = { ...existingIngredients };
    updatedIngredients.strIngredient.push('');
    updatedIngredients.strMeasure.push('');
    setExistingIngredients(updatedIngredients);
  }

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = { ...existingIngredients };
    updatedIngredients.strIngredient.splice(index, 1);
    updatedIngredients.strMeasure.splice(index, 1);
    setExistingIngredients(updatedIngredients);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Card style={styles.cardContainer}>
          {recipe2 && <Card.Cover resizeMethod="auto" source={{ uri: recipe2.strMealThumb }} />}
        </Card>
        <Card style={styles.cardContainer}>
          <View style={styles.cardContainer2}>
            <View style={styles.container2}>
              <Text>Recipe name</Text>
              <TextInput
                style={styles.textInput}
                value={recipeName || recipe2.strMeal}
                onChangeText={handleEditRecipeName}
              />
            </View>
            <View style={styles.container2}>
              <Text>Category</Text>
              <TextInput
                style={styles.textInput}
                value={categoryText || recipe2.strCategory}
                onChangeText={handleEditCategory}
              />
            </View>
            <View style={styles.container2}>
              <Text>Area</Text>
              <TextInput
                style={styles.textInput}
                value={areaText || recipe2.strArea}
                onChangeText={handleEditArea}
              />
            </View>
          </View>
        </Card>

        <Card style={styles.cardContainer}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Existing Ingredients</DataTable.Title>
              <DataTable.Title numeric>Measure</DataTable.Title>
            </DataTable.Header>
            {(existingIngredients.strIngredient || []).map((ingredient, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>
                  <TextInput
                    style={styles.textInput}
                    value={ingredient}
                    onChangeText={(text) => handleEditIngredient(text, index)}
                  />
                </DataTable.Cell>
                <DataTable.Cell>
                  <TextInput
                    style={styles.textInput}
                    value={existingIngredients.strMeasure[index]}
                    onChangeText={(text) => handleEditMeasure(text, index)}
                  />
                </DataTable.Cell>
                <DataTable.Cell>
                  <IconButton icon="delete" onPress={() => handleDeleteIngredient(index)} />
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
          <Button icon="plus" mode="contained" onPress={handleAddIngredient}>Add Ingredient</Button>
        </Card>

        <Card style={styles.cardContainer}>
          <TextInput
            style={styles.textInput}
            value={instructions || recipe2.strInstructions}
            onChangeText={handleEditInstructions}
            multiline
          />
        </Card>

        <Button onPress={handleSave}>Save Changes</Button>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {

  },
  cardContainer: {

    marginHorizontal: 8,
    marginVertical: 8,

  },
  cardContainer2: {

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
  },
  textInput: {
    margin: 15,
},
})