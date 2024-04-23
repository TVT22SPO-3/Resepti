import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import { useAuth } from '../context/useAuth';
import { firestore, query, collection } from '../firebase/config';
import { onSnapshot, orderBy, where, } from 'firebase/firestore';
import { SearchByUid } from '../FirebaseDB/SearchBy';
import SmallRecipeCard from './RecipeCard/SmallRecipeCard';
import { getAuth } from 'firebase/auth'
import { Card } from 'react-native-paper';
import Styles from '../Styles';
import { useTheme } from '../context/useTheme';
import database from '@react-native-firebase/database';


export default function ShowRecipes() {
    const {isDarkMode} = useTheme()
    const { user } = useAuth()
    const uid = user.uid
    const [recipes, setRecipes] = useState([]);
    const [changes, setChanges] = useState([]);
    const auth = getAuth();


    useEffect(() => {
        const { currentUser } = getAuth();
        const uid = currentUser.uid;

        const q = query(collection(firestore, 'recipes'), where('uid', '==', uid));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const recipeData = [];
          querySnapshot.forEach((doc) => {
            recipeData.push({ id: doc.id, ...doc.data() });
          });

          const extractedData = recipeData.map(data => {
            return {
              idMeal: data.id,   
              strMeal: data.strMeal,
              strMealThumb: data.strMealThumb,
              uid: data.uid
            };
          });
          setRecipes(extractedData);
        });
      
        return () => {
          unsubscribe();
        };
    }, []);


    useEffect(() =>{
        const getRecipeByUid = async () => {
        try{
            const data = await SearchByUid(uid)
            setRecipes(data)
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaadasdasdasdasd',recipes)
        }catch(error){
            console.log("Error receiving data by uid",error)
        }
    } 
    getRecipeByUid()
    },[])

    const renderSeparator = () => <View style={styles.separator} />;

    return (
        <View >
            <Card style={[styles.container,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
                <Text style={[styles.text,isDarkMode ? Styles.darkCard : Styles.lightCard]}>Own Recipes:</Text>
                <SafeAreaView>
                    <FlatList
                        horizontal
                        data={recipes}
                        renderItem={({item,index}) => <SmallRecipeCard item={item} key={index}/>}
                        ItemSeparatorComponent={renderSeparator}
                        contentContainerStyle={styles.contentContainer}
                    />
                </SafeAreaView>
            </Card>
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom:24,
        margin: (24, 24, 24, 24),
        borderRadius: 10,
        
      },
    
    container2: {
        backgroundColor: '#faebd7',
        marginHorizontal: 12,
    },
    text:{
        paddingBottom: 10,
        alignSelf: 'center',
        fontSize: 18,
    },
    separator: {
        height: 24,
        width: 20,
        paddingLeft: 20,
    },
    contentContainer: {
        flexGrow: 1,
        paddingLeft: 10,
        paddingEnd: 10,
    },
})