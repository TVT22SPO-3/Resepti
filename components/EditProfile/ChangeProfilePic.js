import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React, { useState, useEffect} from 'react'
import { Button, Card, Avatar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RequestStoragePermission from '../../Permissions';
import * as ImagePicker from 'expo-image-picker';
import { storage, ref, uploadBytes, getDownloadURL } from '../../firebase/config';
import { getAuth, updateProfile } from 'firebase/auth';
import { useAuth } from '../../context/useAuth'



export default function ChangeProfilePic(){

    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const { user } = useAuth()

    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    }

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
        }
    };

    const handleImageChange = async (userCredential) => {
      
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

      const auth = getAuth();
      updateProfile(auth.currentUser, {
        photoURL: imageUrl
      });
    };

    return(
        <View style={{ paddingTop: 12 }}>
            <Card style={styles.container3}>
              <Pressable onPress={toggleAccordion}>
                <View style={styles.infoContainer}>
                  <Text style={styles.texti2}>CHANGE PROFILE PICTURE</Text>
                  <MaterialCommunityIcons
                    name='arrow-down-thick'
                    size={24}
                  />
                </View>
              </Pressable>
              {isOpen && (
                <View style={styles.container3}>
                    {user.photoURL ? (
                        <Avatar.Image size={160} source={{ uri: user.photoURL }} />
                        ) : (
                        <Avatar.Image size={160} source={require('../../assets/trash.png')} />
                    )}
                    <View style={{ marginTop: 20 }}>
                        <Pressable style={styles.addImagesButton} onPress={openImagePicker}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </Pressable>
                        <Pressable style={styles.addImagesButton} onPress={handleImageChange}>
                            <Text style={styles.buttonText}>Save</Text>
                        </Pressable>
                    </View>
                </View>
              )}
            </Card>
        </View>

    );
}


  
  const styles = StyleSheet.create({
    container3: {
        backgroundColor: '#faebd7',
        marginHorizontal: 12,
    },
    texti2: {
        fontSize: 18,
        textAlign: 'center',
        paddingRight: 24
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 4,
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
  });