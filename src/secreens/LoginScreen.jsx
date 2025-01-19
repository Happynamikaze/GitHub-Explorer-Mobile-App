import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
<View style={styles.loadcontainer}>
  <Image source={require('../assets/images/app_login.png')} style={styles.loadlogo} />
  <Text style={styles.loadtitle}>Hey there, {"\n"} Welcome to GitHub Explorer!</Text>


  <Text style={styles.subloadtitle}>Ready to explore some cool GitHub repositories?{"\n"} Let's go!</Text>
  <TouchableOpacity
    style={styles.button}
    onPress={() => navigation.navigate('SearchRepositories')}
  >
    <Text style={styles.buttonText}>Start Exploring</Text>
  </TouchableOpacity>
</View>

  
  );
};
const styles = StyleSheet.create({
	loadcontainer: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: '#f4f4f4',
	  padding: 16,
	},
	loadlogo: {
	  width: 200,
	  height: 200,
	  marginBottom: 20,
	},
	loadtitle: {
	  fontSize: 24,
	  fontWeight: 'bold',
	  color: '#252525',
	  marginBottom: 10,
	  textAlign: 'center',
	},
	subloadtitle: {
	  fontSize: 16,
	  color: '#252525',
	  marginBottom: 20,
	  textAlign: 'center',
	//   paddingHorizontal: 40,
	},
	button: {
		backgroundColor: '#5319ac',
		borderWidth: 2,
		borderColor: 'white',
		borderRadius: 20,
		paddingVertical: 8,
		paddingHorizontal: 15,
		alignItems: 'center',
		justifyContent: 'center',

	},
	buttonText: {
	  color: 'white',
	  fontSize: 16,
	  fontWeight: 'bold',
	},
  });
  
export default LoginScreen;
