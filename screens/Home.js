import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import Hometext from '../components/Hometext';
import Sign from '../components/Sign';


export default function Home({navigation}) {

  return (
    <View style={styles.container}>

      <Hometext navigation={navigation}/>
      <Sign navigation={navigation}/>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button:{
  marginVertical: 12,
  width: 240,
  }
});
