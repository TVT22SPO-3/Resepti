import { View, ScrollView, Text, StyleSheet, Pressable, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect} from 'react'
import { DataTable, TextInput, IconButton, Picker, Button, Title, Chip, Dialog, Paragraph, Button as PaperButton, Snackbar, Icon } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RequestStoragePermission from '../Permissions';
import * as ImagePicker from 'expo-image-picker';
import { firestore, collection, addDoc, serverTimestamp } from '../firebase/config';
import { storage, ref, uploadBytes, getDownloadURL } from '../firebase/config';
import { useAuth } from '../context/useAuth'




export default function OwnRecipes() {

  return (
    <View>  
      <AddRecipes />
    </View>
  )
}

function AddRecipes() {
	const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false);
	const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState([{ ingredient: '', measure: '' }]);
  const [instructions, setInstructions] = useState('');
	const [category, setCategory] = useState('');
	const [area, setArea] = useState('');
	const [selectedImage, setSelectedImage] = useState(null);
	const [showNotification, setShowNotification] = useState(false);
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const onDismissSnackBar = () => setVisible(false);

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

	const saveCategory = (category) => {
    setCategory(category);
  };

  const saveArea = (area) => {
    setArea(area);
  };

	const clearInputs = () => {
    	setRecipeName('');
		setIngredients([{ ingredient: '', measure: '' }]);
		setInstructions('');
		setSelectedImage(null);
		setCategory('');
		setArea('');
  };	

    const saveRecipe = async () => {
		const strIngredient = []
		const strMeasure = []
		ingredients.forEach(item => {
			strIngredient.push(item.ingredient)
			strMeasure.push(item.measure)
		})
		console.log('ingr,measure', strIngredient, strMeasure)
        console.log('Recipe Name:', recipeName);
        console.log('Ingredients:', ingredients);
        console.log('Instructions:', instructions);
		console.log('Image:', selectedImage);

			try {
				const response = await fetch(selectedImage);
						const blob = await response.blob();

				const uniqueId = () => {
					return Math.random().toString(36).substr(2, 9); 
				};
				const uniqueFileName = `${Date.now()}_${uniqueId()}.jpg`;
						const imageRef = ref(storage, `images/${uniqueFileName}`);
				await uploadBytes(imageRef, blob);

				console.log(selectedImage);
				const imageUrl = await getDownloadURL(imageRef);

			await addDoc(collection(firestore, 'recipes'), {
				uid: user.uid,
				username: user.displayName,
				strMeal: recipeName,
				strIngredient: strIngredient,
				strMeasure: strMeasure,
				strInstructions: instructions,
				strMealThumb: imageUrl,
				strCategory: category,
				strArea: area,
				date: serverTimestamp()
			});
			clearInputs();
			setSnackbarVisible(true);
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
					<MaterialCommunityIcons name="chevron-up" color={'black'} size={40} /> 
					: 
					<MaterialCommunityIcons name="chevron-down" color={'black'} size={40} />  
				}
					{'   Optional information'}
                </Text>
            </Pressable>
            {isOpen && (
              <View style={{ padding: 10 }}>
					<AddCategory value={category} onChangeCategory={saveCategory} onChangeCategoryText={setCategory}/>
					<View style={styles.divider} />
					<AddArea value={area} onChangeArea={saveArea} onChangeAreaText={setArea}/>
					<View style={styles.divider} />
					<AddImages onChangeImage={handleImageChange} />
					<View style={styles.divider} />
              </View>
							
            )}
            <Pressable style={styles.saveButton} onPress={saveRecipe}>
                <Text style={styles.buttonText}>Save</Text>
            </Pressable>
			<Snackbar
				visible={snackbarVisible}
				onDismiss={onDismissSnackBar}
				duration={3000}
				action={{
					label: 'Ok',
				}}>
          		Recipe created!
        	</Snackbar>
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

        if (!pickerResult.canceled) {
            const selectedUri = pickerResult.assets[0].uri;
            setSelectedImage(selectedUri);
            props.onChangeImage(selectedUri);
        }
    };

    return (
        <View style={{ flex: 1 }}>
					<Title style={styles.title}>Images</Title>
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
                maxLength={400}
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

  
		  {ingredients.map((ingredient, index) => (
			<DataTable.Row style={styles.tableRow} key={index}>
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
      			<IconButton onPress={() => handleRemoveIngredient(index)} icon="delete" iconColor={'#FFA500'}color={'#505050'} size={30} />  
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

	
function AddCategory(props){

	const { value, onChangeCategory, onChangeCategoryText } = props;

	const handleCategoryTextChange = (text) => {
		onChangeCategoryText(text);
  };

	const handleCategoryChange = (categoryValue) => {
		onChangeCategory(categoryValue);
		onChangeCategoryText(categoryValue);
  };

	return(
		<View style={styles.title}>
			<Title>Categories</Title>
			<TextInput
				  style={styles.textInput}
				  value={value}
				  onChangeText={handleCategoryTextChange}
				  placeholder="'Category"
				  placeholderTextColor="#CCC7B9"
			/>

			<View style={styles.divider} />
			<Text>Popular Categories</Text>
			<View style={styles.chipContainer}>
				<Chip style={styles.chip} icon="food-drumstick" onPress={() => handleCategoryChange('Dairy')}>Dairy</Chip>
				<Chip style={styles.chip} icon="food-drumstick" onPress={() => handleCategoryChange('Protein')}>Protein</Chip>
				<Chip style={styles.chip} icon="food-drumstick" onPress={() => handleCategoryChange('Vegetarian')}>Vegetarian</Chip>
				<Chip style={styles.chip} icon="food-drumstick" onPress={() => handleCategoryChange('Gluten frees')}>Gluten free</Chip>
				<Chip style={styles.chip} icon="food-drumstick" onPress={() => handleCategoryChange('Dessert')}>Dessert</Chip>
				<Chip style={styles.chip} icon="food-drumstick" onPress={() => handleCategoryChange('Italian')}>Italian</Chip>
				<Chip style={styles.chip} icon="food-drumstick" onPress={() => handleCategoryChange('Keto')}>Keto</Chip>
				<Chip style={styles.chip} icon="food-drumstick" onPress={() => handleCategoryChange('Halal')}>Halal</Chip>
				<Chip style={styles.chip} icon="food-drumstick" onPress={() => handleCategoryChange('Low Calorie')}>Low Calorie</Chip>
			</View>
	  </View>
	);
}

	
function AddArea(props){

	const { value, onChangeArea, onChangeAreaText } = props;

	const handleAreaTextChange = (text) => {
		onChangeAreaText(text);
  };

	const handleAreaChange = (areaValue) => {
    	onChangeArea(areaValue);
		onChangeAreaText(areaValue);
  };

	return(
		<View style={styles.title}>
			<Title>Area</Title>
			<TextInput
				  style={styles.textInput}
				  value={value}
				  onChangeText={handleAreaTextChange}
				  placeholder="Area"
				  placeholderTextColor="#CCC7B9"
			/>

			<View style={styles.divider} />
			<Text>Popular Areas</Text>
			<View style={styles.chipContainer}>
				<Chip style={styles.chip} icon="earth" onPress={() => handleAreaChange('Japan')}>Japan</Chip>
				<Chip style={styles.chip} icon="earth" onPress={() => handleAreaChange('France')}>France</Chip>
				<Chip style={styles.chip} icon="earth" onPress={() => handleAreaChange('Nepal')}>Nepal</Chip>
				<Chip style={styles.chip} icon="earth" onPress={() => handleAreaChange('China')}>China</Chip>
				<Chip style={styles.chip} icon="earth" onPress={() => handleAreaChange('Mexico')}>Mexico</Chip>
				<Chip style={styles.chip} icon="earth" onPress={() => handleAreaChange('USA')}>USA</Chip>
				<Chip style={styles.chip} icon="earth" onPress={() => handleAreaChange('Greece')}>Greece</Chip>
			</View>
	  </View>
	);
}


  
  const styles = StyleSheet.create({
	divider: {
		borderBottomColor: '#E0E0E0', 
		borderBottomWidth: 1, 
		marginHorizontal: 10, 
		marginTop: 3,
		marginBottom: 10,
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
	tableRow: {
		justifyContent: 'space-between',
		height: 70,
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
	  backgroundColor: '#FFA500',
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
	chipContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
	},
	chip: {
		marginHorizontal: 3,
		marginVertical: 3,
		backgroundColor: '#FFA500',
		
	},
	highlight: {
		opacity: 0.4, 
	},
  });


