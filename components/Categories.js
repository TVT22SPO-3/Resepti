import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { fetchAllCategories } from './TheMealDB/SearchBy';
import SmallRecipeCard from './RecipeCard/SmallRecipeCard';
import CategoryCard from './RecipeCard/CategoryCard';
import Styles from '../Styles';
import { useTheme } from '../context/useTheme';
import { useRoute } from '@react-navigation/native';
export default function Categories() {
    
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const NUM_FETCHES = 5;
  const {isDarkMode} = useTheme()
    

  useEffect(() =>{
      const getCategories = async () => {
          try{
              let accumulatedData = [];
              for (let i = 0; i < NUM_FETCHES; i++) {
                  const data = await fetchAllCategories();
                  accumulatedData = [...accumulatedData, ...data];
              }
              setCategories(accumulatedData);
              console.log("here's the data: ", data)
              setLoading(false);
          }catch(error){
              console.log("Error receiving random meals",error)
              setLoading(false);
          }
      } 
      getCategories()
  },[]);


  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={[styles.container,isDarkMode ? Styles.darkContainer : Styles.lightContainer]}>
        <Text style={[styles.text,isDarkMode ? Styles.darkContainer : Styles.lightContainer]}>Categories:</Text>
        {loading ? (
                <Text>Loading...</Text>
            ) : (
            <SafeAreaView>
                <FlatList
                    horizontal
                    data={categories}
                    renderItem={({ item, index }) =><CategoryCard item={item} key={index}/>}
                    ItemSeparatorComponent={renderSeparator}
                    contentContainerStyle={styles.contentContainer}
                />
            </SafeAreaView>
        )}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      paddingTop: 24,
      paddingBottom: 24,
      justifyContent: 'center',
      margin: (24, 24, 24, 24),
      borderRadius: 10,
    },
  text:{
      paddingLeft: 10,
      fontStyle: 'italic',
      fontSize: 18,
  },
  separator: {
      height: 24,
      width: 20,
      paddingLeft: 20,
  },
  contentContainer: {
      alignItems:'center',
      flexGrow: 1,
      paddingLeft: 10,
      paddingEnd: 10,
  },
})