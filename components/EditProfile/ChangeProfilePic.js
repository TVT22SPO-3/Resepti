import { View, Text, StyleSheet, Pressable, Image, Alert } from 'react-native'
import React, { useState, useEffect} from 'react'
import { Button, Card, Avatar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RequestStoragePermission from '../../Permissions';
import * as ImagePicker from 'expo-image-picker';
import { storage, ref, uploadBytes, getDownloadURL, auth } from '../../firebase/config';
import { getAuth, updateProfile } from 'firebase/auth';
import { useAuth } from '../../context/useAuth'
import { useTheme } from '../../context/useTheme';
import Styles from '../../Styles';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function ChangeProfilePic(){

    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const { user } = useAuth();
    const [avatarUrl, setAvatarUrl] = useState(user.photoURL);
    const {isDarkMode} = useTheme()

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
          setAvatarUrl(selectedUri);
        }
    };

    const handleImageChange = async () => {

      if(!selectedImage){
        Alert.alert('Choose picture', 'You need to choose picture first!', [
          {
            text: 'Ok',
            onPress: () => console.log('Ok Pressed'),
            style: 'cancel',
          },

        ]);
      }
      
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
      setSelectedImage(null);
    };

    return(
        <View style={[styles.container,isDarkMode ? Styles.dark : Styles.light]}>
            <Card style={[styles.container1,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
              <Pressable onPress={toggleAccordion}>
                <View style={[styles.infoContainer,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
                  <Text style={[styles.texti2,isDarkMode ? Styles.darkCard : Styles.lightCard]}>CHANGE PROFILE PICTURE</Text>
                  <MaterialCommunityIcons
                    name='arrow-down-thick'
                    size={24}
                  />
                </View>
              </Pressable>
              {isOpen && (
                <View style={[styles.container2,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
                  <View style={[styles.container3,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
                    {avatarUrl ? (
                        <Avatar.Image size={70} source={{ uri: avatarUrl }} />
                        ) : (
                        <Avatar.Image size={70} source={require('../../assets/trash.png')} />
                    )}
                    <TouchableOpacity  onPress={openImagePicker}>
                        <Text style={[isDarkMode ? Styles.darkButtonText : Styles.lightButtonText]}>CHOOSE PICTURE</Text>
                    </TouchableOpacity>
                  </View> 
                    <TouchableOpacity style={{ marginHorizontal: 30 }} onPress={handleImageChange}>
                      <Text style={[isDarkMode ? Styles.darkButtonText : Styles.lightButtonText]}>EDIT</Text>
                    </TouchableOpacity>             
                </View>
              )}
            </Card>
        </View>

    );
}


  
const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: '#faebd7',
    marginHorizontal: 12,
  },
  container:{
    marginTop: 12,
  },
  container2: {
    flex: 1, 
    flexDirection: 'row',
    marginVertical: (12, 12),
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#faebd7',
  },
  container3: {
    flex: 1, 
    flexDirection: 'row',
    marginLeft: 12,
    alignItems: 'center',
    backgroundColor: '#faebd7',
  },
  texti2: {
    fontSize: 18,
    textAlign: 'center',
    paddingRight: 24,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 4,
    borderRadius:10,
  },
});
