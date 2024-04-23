import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Card, DataTable, IconButton, TextInput, Button, Title } from 'react-native-paper'
import { useNavigation, useNavigationState, useRoute } from '@react-navigation/native'
import { fetchMealById } from '../TheMealDB/SearchBy'
import { SearchByDocId } from '../../FirebaseDB/SearchBy'
import { useAuth } from '../../context/useAuth'
import { doc, updateDoc, getDoc, where, collection, firestore} from '../../firebase/config';
import { set } from 'firebase/database'
import Styles from '../../Styles'
import { useTheme } from '../../context/useTheme'

export default function FullEditRecipeCard() {
  const navigation = useNavigationState(state => state.routes[state.index].state)
  const { user } = useAuth();
  const route = useRoute()
  const { itemid } = route.params
  const [recipe2, setRecipe2] = useState("")
  const [categoryText, setCategoryText] = useState('');
  const [areaText, setAreaText] = useState('');
  const [recipeName, setRecipeName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState({ strIngredient: [], strMeasure: [] });
  const [newIngredient, setNewIngredient] = useState({ name: '', measure: '' });
  const {isDarkMode} = useTheme()

  useEffect(() => {
    const getRecipe = async () => {
      console.log(itemid)
      try {
        const DocById = await SearchByDocId(itemid)
        console.log("GetDoc", DocById)
        setRecipe2(DocById)
        const existingIngredients = {
          strIngredient: DocById.strIngredient || [], 
          strMeasure: DocById.strMeasure || [], 
        };
        setRecipeName(DocById.strMeal);
        setInstructions(DocById.strInstructions);
        setAreaText(DocById.strArea);
        setCategoryText(DocById.strCategory);
        setIngredients(existingIngredients);
        console.log(existingIngredients);
      } catch (error) {
        console.log("errorGetMealFB", error)
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

  const handleEditIngredient = (text, index) => {
    const updatedIngredients = { ...ingredients };
    updatedIngredients.strIngredient[index] = text;
    setIngredients(updatedIngredients);
  }

  const handleEditMeasure = (text, index) => {
    const updatedIngredients = { ...ingredients };
    updatedIngredients.strMeasure[index] = text;
    setIngredients(updatedIngredients);
  }

  const handleEditRecipeName = (text) => {
    setRecipeName(text);
    setRecipe2(prevRecipe => ({
      ...prevRecipe,
      strMeal: text
    }));
  }

  const handleSave = async () => {
    console.log("Saved changes:", {
      strMeal: recipeName,
      strCategory: categoryText,
      strArea: areaText,
      strInstructions: instructions,
      ...ingredients
    });

    console.log(user.uid);
    console.log(itemid);


    const docRef = doc(collection(firestore, "recipes"), itemid);

    try {
        await updateDoc(docRef, {
          strMeal: recipeName,
          strCategory: categoryText,
          strArea: areaText,
          strInstructions: instructions,
          ...ingredients
        })
        console.log("Recipe updated!")

    } catch (error) {
        console.log("Recipe update failed", error)
    }

  }

  const handleAddIngredient = () => {
    const updatedIngredients = { ...ingredients };
    updatedIngredients.strIngredient.push('');
    updatedIngredients.strMeasure.push('');
    setIngredients(updatedIngredients);
  }

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = { ...ingredients };
    updatedIngredients.strIngredient.splice(index, 1);
    updatedIngredients.strMeasure.splice(index, 1);
    setIngredients(updatedIngredients);
  }

  return (
    <ScrollView style={[styles.container,isDarkMode ? Styles.dark : Styles.light]}>
      <View style={[styles.container,isDarkMode ? Styles.dark : Styles.light]}>
        <Card style={[styles.cardContainer,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
          {recipe2 && <Card.Cover resizeMethod="auto" source={{ uri: recipe2.strMealThumb }} />}
        </Card>

        <Card style={[styles.cardContainer,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
          <View style={styles.cardContainer2}>
            <View style={styles.container2}>
              <Title style={[styles.title,isDarkMode ? Styles.darkCard : Styles.lightCard]}>Recipe name</Title>
              <TextInput
                style={styles.textInput}
                value={recipeName || recipe2.strMeal}
                onChangeText={handleEditRecipeName}
              />
            </View>
            <View style={styles.container2}>
              <Title style={[styles.title,isDarkMode ? Styles.darkCard : Styles.lightCard]}>Category</Title>
              <TextInput
                style={styles.textInput}
                value={categoryText || recipe2.strCategory}
                onChangeText={handleEditCategory}
              />
            </View>
            <View style={styles.container2}>
              <Title style={[styles.title,isDarkMode ? Styles.darkCard : Styles.lightCard]}>Area</Title>
              <TextInput
                style={styles.textInput}
                value={areaText || recipe2.strArea}
                onChangeText={handleEditArea}
              />
            </View>
          </View>
        </Card>


        <Card style={[styles.cardContainer,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
          <View style={styles.cardContainer2}>
            <Title style={[styles.title,isDarkMode ? Styles.darkCard : Styles.lightCard]}>Ingredients</Title>
            <DataTable>
              {(ingredients.strIngredient || []).map((ingredient, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>
                    <TextInput
                      style={styles.textInput}
                      value={ingredient}
                      placeholder="Ingredient"
                      placeholderTextColor="#CCC7B9"
                      onChangeText={(text) => handleEditIngredient(text, index)}
                    />
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <TextInput
                      style={styles.textInput}
                      value={ingredients.strMeasure[index]}
                      placeholder="Measure"
                      placeholderTextColor="#CCC7B9"
                      onChangeText={(text) => handleEditMeasure(text, index)}
                    />
                  </DataTable.Cell>
                  <IconButton
                    icon="delete"
                    iconColor='#FFA500'
                    size={30}
                    onPress={() => handleDeleteIngredient(index)}
                  />
                </DataTable.Row>
              ))}
            </DataTable>
            <Pressable style={styles.addButton} onPress={handleAddIngredient}>
              <Text style={styles.buttonText}>+ Add Ingredient</Text>
            </Pressable>
          </View>
        </Card>

        <Card style={[styles.cardContainer,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
          <View style={styles.cardContainer2}>
            <Title style={[styles.title,isDarkMode ? Styles.darkCard : Styles.lightCard]}>Instructions</Title>
            <TextInput
              style={styles.textInput}
              value={instructions || recipe2.strInstructions}
              onChangeText={handleEditInstructions}
              multiline
            />
          </View>
        </Card>

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
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
    margin: 10,
    minWidth: 120,
  },
  title: {
    margin: 10, 
  },
  addButton: {
	  alignItems: 'center',
	  justifyContent: 'center',
	  paddingVertical: 5,
	  marginHorizontal: 10,
	  marginVertical: 5,
	  borderRadius: 3,
	  elevation: 3,
	  backgroundColor: '#ffa500',
	},
  saveButton: {
	  alignItems: 'center',
    height: 50,
	  justifyContent: 'center',
	  paddingVertical: 5,
	  marginHorizontal: 10,
	  marginVertical: 20,
	  borderRadius: 3,
	  elevation: 3,
    backgroundColor: '#109648',
	},
  buttonText:{
    color: 'white'
  }
})