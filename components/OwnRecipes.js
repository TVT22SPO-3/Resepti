import { View, ScrollView, Text, StyleSheet, Pressable, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect} from 'react'
import { DataTable, TextInput, Picker, Button, Title } from 'react-native-paper';
import RequestStoragePermission from '../Permissions';
import * as ImagePicker from 'expo-image-picker';
import { firestore, collection, addDoc, serverTimestamp } from '../firebase/config';
import { storage, ref, uploadBytes, getDownloadURL } from '../firebase/config';


export default function OwnRecipes() {
  return (
    <View>
      <AddRecipes />
    </View>
  )
}

function AddRecipes() {
    const [isOpen, setIsOpen] = useState(false);
	const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState([{ ingredient: '', measure: '' }]);
    const [instructions, setInstructions] = useState('');
	const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (imageUri) => {
        setSelectedImage(imageUri);
    };

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

	const saveInstructions = (instructions) => {
        setInstructions(instructions);
    };

	const saveName = (recipeName) => {
        setRecipeName(recipeName);
    };

	const saveIgredients = (ingredients) => {
        setIngredients(ingredients);
    };

    const saveRecipe = async () => {
        console.log('Recipe Name:', recipeName);
        console.log('Ingredients:', ingredients);
        console.log('Instructions:', instructions);
		console.log('Image:', selectedImage);

		/*const recipeData = {
			name: recipeName,
			ingredients: ingredients,
			instructions: instructions,
			image: selectedImage,
			createdAt: firebase.firestore.FieldValue.serverTimestamp()
		};

		db.collection('recipes').add(recipeData)
        .then((docRef) => {
            console.log('Recipe saved successfully with ID:', docRef.id);
            // Optionally, you can navigate to another screen or perform other actions upon successful save
        })
        .catch((error) => {
            console.error('Error saving recipe:', error);
        });*/

		try {
			const response = await fetch(selectedImage);
        	const blob = await response.blob();

			const uniqueId = () => {
				return Math.random().toString(36).substr(2, 9); // Generates a random alphanumeric string
			};
			const uniqueFileName = `${Date.now()}_${uniqueId()}.jpg`;
        	const imageRef = ref(storage, `images/${uniqueFileName}`);
			await uploadBytes(imageRef, blob);

			console.log(selectedImage);
			const imageUrl = await getDownloadURL(imageRef);

			await addDoc(collection(firestore, 'recipes'), {
				name: recipeName,
				ingredients: ingredients,
				instructions: instructions,
				image: imageUrl,
				createdAt: serverTimestamp()
			});
			console.log('Recipe saved successfully.');
		} catch (error) {
			console.error('Error saving recipe: ', error);
		}
		  
    };

    return (
        <ScrollView>
            <AddRecipeName value={recipeName} onChangeText={setRecipeName} onChangeName={saveName} />
            <View style={styles.divider} />
            <AddIngredients onChangeIngredients={saveIgredients} />
            <View style={styles.divider} />
            <AddInstructions value={instructions} onChangeText={setInstructions} onChangeInstructions={saveInstructions} />
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
                    <AddImages onChangeImage={handleImageChange} />
					<View style={styles.divider} />
                </View>
            )}
            <Pressable style={styles.saveButton} onPress={saveRecipe}>
                <Text style={styles.buttonText}>Save</Text>
            </Pressable>
        </ScrollView>
    );
}


function AddImages(props) {
	
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
            props.onChangeImage(selectedUri);
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


function AddRecipeName(props){

	const { value, onChangeText, onChangeName } = props;

	const handleTextChange = (text) => {
        onChangeText(text);
        onChangeName(text);
    };

	return(

		<View style={styles.container}>
			<Title style={styles.title}>Recipe name</Title>
			<TextInput
				  style={styles.textInput}
				  value={value}
				  onChangeText={handleTextChange}
				  placeholder="Recipe name"
				  placeholderTextColor="#CCC7B9"
				/>
    	</View> 
	);
}


function AddInstructions(props) {
    const { value, onChangeText, onChangeInstructions } = props;

    const handleTextChange = (text) => {
        onChangeText(text);
        onChangeInstructions(text);
    };

    return (
        <View style={styles.container}>
            <Title style={styles.title}>Instructions</Title>
            <TextInput
                editable
                multiline
                numberOfLines={6}
                maxLength={40}
                onChangeText={handleTextChange}
                value={value}
                style={styles.addInstructions}
                placeholder="Add instructions"
                placeholderTextColor="#CCC7B9"
            />
        </View>
    );
}


function AddIngredients(props) {

	
	const [ingredients, setIngredients] = useState([{ ingredient: '', measure: '' }]);
	const [isPressed, setIsPressed] = useState(false);
  
	const handleAddIngredient = () => {
        const newIngredients = [...ingredients, { ingredient: '', measure: '' }];
        setIngredients(newIngredients);
        props.onChangeIngredients(newIngredients); 
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index][field] = value;
        setIngredients(updatedIngredients);
        props.onChangeIngredients(updatedIngredients); 
    };

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
        props.onChangeIngredients(updatedIngredients); 
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


