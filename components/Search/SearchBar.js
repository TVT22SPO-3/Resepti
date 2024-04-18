import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import { useState } from 'react'
import React from 'react'
import { SearchByIngredient, SearchByName } from '../../FirebaseDB/SearchBy'
import { fetchMealByName } from '../TheMealDB/SearchBy'
import { useNavigation } from '@react-navigation/native'
import SearchPage from './SearchPage'

export default function SearchBar() {
    const navigation = useNavigation()
    const [SearchTerm, setSearchTerm] = useState('')
    const [SearchData, setSearchData] = useState([])

    const handleSearch = async () => {
        console.log("Search", SearchTerm)

        try {
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
            navigation.navigate('SearchPage', { SearchData: newData })
            setSearchTerm("")
            setSearchData([])
        } catch (error) {

            console.log("SearchBarError", error)
        }


    }

    return (

        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Enter meal name"
                onChangeText={setSearchTerm}
                value={SearchTerm}
            />
            <Button title="Search" onPress={handleSearch} color="#FFA500" />
        </View>
    )
}


const styles = StyleSheet.create({
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