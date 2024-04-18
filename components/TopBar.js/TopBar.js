import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Appbar, Dialog, Paragraph, Button as PaperButton, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ThemeSwitchButton from '../ThemeSwitch/ThemeSwitchButton';
import { useAuth } from '../../context/useAuth'
import { Logout } from '../../screens/Login';
import { auth, onAuthStateChanged } from '../../firebase/config';



export default function TopBar() {
  const navigation = useNavigation();
	const { user } = useAuth();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [dialogVisible, setDialogVisible] = useState(false);

  const handleLogout = () => {
    setDialogVisible(true);
  };

  const handleCancelLogout = () => {
    setDialogVisible(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      console.log('logged in or out', !!user); 
    });
    return () => unsubscribe();
  }, [auth]);
 
  return (
		<>
			<Appbar.Header style={styles.topBarContainer}>
				<Appbar.BackAction onPress={() => navigation.goBack()} />

				<View style={styles.rightElement}>
					{isLoggedIn ? (
						<View style={{ marginRight: 10 }}>
							<Button title="Logout" onPress={handleLogout} />
						</View>
					) : (
						<>
							<View style={{ marginRight: 10 }}>
								<LoginButton navigation={navigation}/>
							</View>
							<View style={{ marginRight: 10 }}>
								<RegisterButton navigation={navigation}/>
							</View>
						</>
					)}

					<View style={{ marginRight: 10 }}>
						<ThemeSwitchButton />
					</View>
				</View>
			</Appbar.Header>
			<Portal>
        <Dialog visible={dialogVisible} onDismiss={handleCancelLogout}>
          <Dialog.Title>Confirm Logout</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to log out?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={handleCancelLogout}>Cancel</PaperButton>
            <LogoutButton />
          </Dialog.Actions>
        </Dialog>
      </Portal>
		</>
  );
}

function LoginButton({ navigation }) {
	
  return (
      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}  
      />
  );
}

function LogoutButton() {
	
	const logoutHandler = () => {
		Logout();
	}

  return (
      <Button
        title="Logout"
        onPress={logoutHandler}  
      />
  );
}

function RegisterButton({ navigation }) {

  return (
      <Button
        title="Register"
        onPress={() => navigation.navigate('Login')}
      />
  );
}

const styles = StyleSheet.create({
  topBarContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  rightElement: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
});


