import React from 'react';
import { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { PaperProvider, Menu, Divider, IconButton, MD3Colors } from 'react-native-paper';
import Login from '../../screens/Login';
import Register from '../register';
import { useNavigation } from '@react-navigation/native';

/*
export default function TopBarMenu() {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  const openMenu = () => {
    setVisible(true);
    console.log('menu opened');
  }
  const closeMenu = () => setVisible(false);

  return (
    
    <PaperProvider>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<MenuButton onPress={openMenu} />}
      >
        <LoginButton navigation={navigation}/>
        <Menu.Item onPress={() => {}} title="Item 1" />
        <Menu.Item onPress={() => {}} title="Item 2" />
        <Divider />
        <Menu.Item onPress={() => {}} title="Item 3" />
      </Menu>
    </PaperProvider>
  );
}

function MenuButton({ onPress }) {
  return (
    <IconButton
      icon="account-details"
      iconColor={'#001219'}
      size={35}
      onPress={onPress}
    />
  );
}*/

function LoginButton({ navigation }) {
  return (
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
        style={{ marginRight: 10 }}
      />
  );
}

function RegisterButton({ navigation }) {
  return (
      <Button
        title="Register"
        onPress={() => navigation.navigate('Signup')}
        style={{ marginRight: 10 }}
      />
  );
}

export { LoginButton, RegisterButton }
