import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { useState } from 'react'
import { Searchbar } from 'react-native-paper';
import React from 'react'
import { SearchByIngredient, SearchByName } from '../../FirebaseDB/SearchBy'
import { fetchMealByName } from '../TheMealDB/SearchBy'
import { useNavigation } from '@react-navigation/native'
import SearchPage from './SearchPage'

export default function SearchBar() {
    const navigation = useNavigation()
    const [SearchTerm, setSearchTerm] = useState('')
    const [SearchData, setSearchData] = useState([])

    const handleSearch =  () => {
        console.log("Search", SearchTerm)
        navigation.navigate('SearchPage', { SearchTerm: SearchTerm })
       /* try {
            setSearchData([])
            const datafbName = await SearchByName(SearchTerm)
            console.log("SearchbarData", datafbName)
            const dataIngr = await SearchByIngredient(SearchTerm)
            console.log("SearchDataIngr", dataIngr)
            const dataName = await fetchMealByName(SearchTerm)
            console.log("dataName", dataName)
            //console.log("length", datafbName.length, "/", dataIngr.length, "/", dataName.length)
            console.log("data", datafbName, "/", dataIngr, "/", dataName)
            const newData = []
                .concat(datafbName || [])
                .concat(dataIngr || [])
                .concat(dataName || []);
            setSearchData(prevData => [...prevData, ...newData]);

            console.log("SearchData", SearchData)
            navigation.navigate('SearchPage', { SearchTerm: SearchTerm })
            setSearchTerm("")
            setSearchData([])
        } catch (error) {

            console.log("SearchBarError", error)
        }*/
        setSearchTerm("")
        setSearchData([])

    }

    return (

        <View style={styles.inputContainer}>
            
            <Searchbar
                placeholder="Enter meal name"
                onChangeText={setSearchTerm}
                value={SearchTerm}
                style={styles.search}                 
            />
            <Button title="Search" onPress={handleSearch} style={styles.searchButton} />
        </View>
    )
}


const styles = StyleSheet.create({
    search:{
        height: 52,
        width: 252,
        textAlign: 'center',
    },
    searchButton:{
        marginLeft: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginHorizontal: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 5,
        marginRight: 5,
        borderRadius: 3,
    },
})