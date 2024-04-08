import { View, ScrollView, Text, StyleSheet, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect} from 'react'
import { DataTable, TextInput, Picker, Button, Title } from 'react-native-paper';
import RequestStoragePermission from '../Permissions';
import * as ImagePicker from 'expo-image-picker';
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';




export default function OwnRecipes() {
  return (
    <View>
      <AddRecipes />
    </View>
  )
}

function AddRecipes() {
    const [isOpen, setIsOpen] = useState(false);


    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };


    const saveRecipe = () => {
        console.log('Ingredients:', ingredients);
    };

    return (
        <ScrollView>
            <AddRecipeName />
			<View style={styles.divider} />
            <AddIngredients />
			<View style={styles.divider} />
            <AddInstructions />
			<View style={styles.divider} />
            <Pressable
                onPress={toggleAccordion}
                style={{ padding: 10 }}
            >
                <Text style={{ fontSize: 16 }}>
				{isOpen ? 
					<Image source={require('../assets/upload.png')} style={styles.image}/> 
					: 
					<Image source={require('../assets/down-arrow.png')} style={styles.image} />	 
				}
					{'   Optional information'}
                </Text>
            </Pressable>
            {isOpen && (
                <View style={{ padding: 10 }}>
                    <Text>Pictures</Text>
                    <AddImages />
					<View style={styles.divider} />
                </View>
            )}
            <Pressable style={styles.saveButton} onPress={saveRecipe}>
                <Text style={styles.buttonText}>Save</Text>
            </Pressable>
        </ScrollView>
    );
}

function AddImages() {
	
    const [selectedImage, setSelectedImage] = useState(null);

    const openImagePicker = async () => { 
		
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); 
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
			RequestStoragePermission();
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
			multiple: false,
        });
		console.log('Picker Result:', pickerResult);

        if (!pickerResult.cancelled) {
			const selectedUri = pickerResult.assets[0].uri; 
			setSelectedImage(selectedUri);
			console.log('Selected Image:', selectedUri);
		}
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center' }}>
                {selectedImage && (
                    <Image
                        source={{ uri: selectedImage }}
                        style={{ width: 200, height: 200, borderRadius: 10 }}
                        resizeMode="cover"
                    />
                )}
            </View>
            <View style={{ marginTop: 20 }}>
                <Pressable style={styles.addImagesButton} onPress={openImagePicker}>
                    <Text style={styles.buttonText}>+ Choose from device</Text>
                </Pressable>
            </View>
        </View>
    );
}


function AddRecipeName(){

	const [value, onChangeText] = useState('');

	return(

		<View style={styles.container}>
			<Title style={styles.title}>Recipe name</Title>
			<TextInput
				  style={styles.textInput}
				  value={value}
				  onChangeText={text => onChangeText(text)}
				  placeholder="Recipe name"
				  placeholderTextColor="#CCC7B9"
				/>
    	</View> 
	);
}


function AddInstructions(){

	const [value, onChangeText] = useState('');

	return(

		<View style={styles.container}>
			<Title style={styles.title}>Instructions</Title>
			<TextInput
				editable
				multiline
				numberOfLines={6}
				maxLength={40}
				onChangeText={text => onChangeText(text)}
				value={value}
				style={styles.addInstructions}
				placeholder="Add instructions"
				placeholderTextColor="#CCC7B9"
			/>
    	</View> 
	);
}


function AddIngredients() {

	const [ingredients, setIngredients] = useState([{ ingredient: '', measure: '' }]);
	const [isPressed, setIsPressed] = useState(false);
  
	const handleAddIngredient = () => {
	  setIngredients([...ingredients, { ingredient: '', measure: '' }]);
	};
  
	const handleIngredientChange = (index, field, value) => {
	  const updatedIngredients = [...ingredients];
	  updatedIngredients[index][field] = value;
	  setIngredients(updatedIngredients);
	};
  
	const handleRemoveIngredient = (index) => {
    setIngredients(prevIngredients => {
        const updatedIngredients = [...prevIngredients];
        updatedIngredients.splice(index, 1);
        return updatedIngredients;
    });
	};

	const handlePressIn = () => {
		setIsPressed(true);
	};
	
	  const handlePressOut = () => {
		setIsPressed(false);
	};
  
	return (
	  <View>
		<Title style={styles.title}>Ingredients</Title>
		<DataTable>
		  <DataTable.Header>
			<DataTable.Title>Ingredient</DataTable.Title>
			<DataTable.Title numeric>Amount</DataTable.Title>
		  </DataTable.Header>
  
		  {ingredients.map((ingredient, index) => (
			<DataTable.Row key={index}>
			  <DataTable.Cell>
				<TextInput
				  style={styles.ingredientInput}
				  value={ingredient.ingredient}
				  onChangeText={(text) =>
					handleIngredientChange(index, 'ingredient', text)
				  }
				  placeholder="Ingredient"
				  placeholderTextColor="#CCC7B9"
				/>
			  </DataTable.Cell>
			  <DataTable.Cell>
				<TextInput
				  value={ingredient.measure}
				  onChangeText={(text) =>
					handleIngredientChange(index, 'measure', text)
				  }
				  placeholder="Measure"
				  placeholderTextColor="#CCC7B9"
				/>
			  </DataTable.Cell>
			  <DataTable.Cell>
			  <TouchableOpacity
				onPress={() => handleRemoveIngredient(index)}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				style={styles.container}
			  >
      			<Image source={require('../assets/trash.png')} style={[styles.image, isPressed && styles.highlight]} />
    		  </TouchableOpacity>	
			  </DataTable.Cell>
			</DataTable.Row>
		  ))}
		  <DataTable.Row>
			<DataTable.Cell colSpan={2} style={styles.addButtonCell}>
			  <Pressable style={styles.addButton} onPress={handleAddIngredient}>
				<Text style={styles.buttonText}>+</Text>
			  </Pressable>
			</DataTable.Cell>
		  </DataTable.Row>
		</DataTable>
		
	  </View>
	);
  }


  
  const styles = StyleSheet.create({
	divider: {
        borderBottomColor: '#E0E0E0', 
        borderBottomWidth: 1, 
        marginHorizontal: 10, 
		marginVertical: 5,
    },
	title: {
		marginHorizontal: 15,
	},
	addInstructions: {
	  margin: 15,  
	},
	textInput: {
		margin: 15,
	},	
	addButtonCell: {
	  alignItems: 'center',
	  justifyContent: 'center',
	  height: 50,
	},
	addButton: {
	  alignItems: 'center',
	  justifyContent: 'center',
	  width: '100%',
	  paddingVertical: 5,
	  marginHorizontal: 10,
	  marginVertical: 5,
	  borderRadius: 3,
	  elevation: 3,
	  backgroundColor: '#BCB8B1',
	},
	saveButton: {
	  alignItems: 'center',
	  justifyContent: 'center',
	  paddingVertical: 12,
	  paddingHorizontal: 32,
	  marginHorizontal: 15,
	  marginVertical: 15,
	  borderRadius: 4,
	  elevation: 3,
	  backgroundColor: '#109648',
	},
	addImagesButton: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 32,
		marginHorizontal: 15,
		marginVertical: 15,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: '#0582CA',
	  },
	buttonText: {
	  fontSize: 16,
	  lineHeight: 21,
	  fontWeight: 'bold',
	  letterSpacing: 0.25,
	  color: 'white',
	},
	image: {
		width: 18,
		height: 18,
	},
	highlight: {
		opacity: 0.4, 
	},
  });


