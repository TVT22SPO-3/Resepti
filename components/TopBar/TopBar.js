import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Appbar, Dialog, Paragraph, Button as PaperButton, Portal, Snackbar } from 'react-native-paper';
import { useNavigation} from '@react-navigation/native';
import ThemeSwitchButton from '../ThemeSwitch/ThemeSwitchButton';
import { useAuth } from '../../context/useAuth'
import { Logout } from '../../screens/Login';
import { auth, onAuthStateChanged } from '../../firebase/config';
import Styles from '../../Styles';
import { useTheme } from '../../context/useTheme';


export default function TopBar() {
  const navigation = useNavigation();
	const { user } = useAuth();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [dialogVisible, setDialogVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);
  const {isDarkMode} = useTheme()

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

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }else{
      setVisible(true);
      console.log('cant go back');
    }
  }
 
  return (
		<>
			<Appbar.Header style={[styles.topBarContainer,isDarkMode ? Styles.darkCard : Styles.lightCard]}>
        
				<Appbar.BackAction onPress={handleGoBack} />

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
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={1500}
          action={{
            label: 'Ok',
            onPress: () => {
            },
          }}>
          Can't go back!
        </Snackbar>
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
        onPress={() => navigation.navigate('Signup')}
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


