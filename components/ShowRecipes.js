import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, SafeAreaView } from 'react-native';
import { useAuth } from '../context/useAuth';
import { firestore, query, collection } from '../firebase/config';
import { onSnapshot, orderBy, where } from 'firebase/firestore';
import { SearchByUid } from '../FirebaseDB/SearchBy';
import SmallRecipeCard from './RecipeCard/SmallRecipeCard';

import { Card } from 'react-native-paper';

export default function ShowRecipes() {
    const { user } = useAuth()
    const uid = user.uid
    const [recipes, setRecipes] = useState([]);
    
    

    useEffect(() =>{
        const getRecipeByUid = async () => {
        try{
            const data = await SearchByUid(uid)
            console.log("tässä data: ",data)
            setRecipes(data)
            console.log(recipes)
        }catch(error){
            console.log("Error receiving data by uid",error)
        }
    } 
    getRecipeByUid()
    },[])

    const renderSeparator = () => <View style={styles.separator} />;

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <FlatList
                    horizontal
                    data={recipes}
                    renderItem={({item,index}) => <SmallRecipeCard item={item} key={index}/>}
                    ItemSeparatorComponent={renderSeparator}
                    contentContainerStyle={styles.contentContainer}
                />
            </SafeAreaView>
        </View>
      )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        paddingBottom:24,
        justifyContent: 'center',
        alignContent: 'center',
        margin: (24, 24, 24, 24),
        borderRadius: '10px',
        backgroundColor: '#faebd7',
      },
    text:{
        paddingBottom: 10,
        alignContent: 'center',
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