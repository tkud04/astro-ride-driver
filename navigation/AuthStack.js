import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppHomeHeader from '../components/AppHomeHeader';
import AppStyles from '../styles/AppStyles';
import AddNumberScreen from '../screens/AddNumberScreen';
import VerifyNumberScreen from '../screens/VerifyNumberScreen';
import AddNameScreen from '../screens/AddNameScreen';
import AddLoginScreen from '../screens/AddLoginScreen';
import UserLoginScreen from '../screens/UserLoginScreen';


////////////////////////////////////////////////

const Stack = createStackNavigator();


let AuthStack = () => (
<Stack.Navigator>
				<Stack.Screen
                  name="AddNumber"
	              component={AddNumberScreen}
				  options={({route}) => ({
				  headerStyle: {
		            backgroundColor: "#000",
		            height: 50
	              },
	             header: () => <AppInputImageHeader r = {route} title="AstroRide" subtitle="Add Number"  sml={10}/>,
	             //headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                />
				<Stack.Screen
                  name="VerifyNumber"
	              component={VerifyNumberScreen}
				  options={({route}) => ({
				  headerStyle: {
		            backgroundColor: "#000",
		            height: 50
	              },
	             header: () => <AppInputImageHeader r = {route} title="AstroRide" subtitle="Verify Number"  sml={10}/>,
	             //headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                />

				<Stack.Screen
                  name="UserLogin"
	              component={UserLoginScreen}
				   options={({route}) => ({
				  headerStyle: {
		            backgroundColor: "#000",
		            height: 50
	              },
	             header: () => <AppInputImageHeader r = {route} title="AstroRide" subtitle="Login"  sml={10}/>,
	             //headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                /> 
				<Stack.Screen
                  name="AddName"
	              component={AddNameScreen}				  
				  //initialParams={{goBack: () => {this.props.navigation.goBack()}}}
				  options={({route}) => ({
				  headerStyle: {
		            backgroundColor: "#000",
		            height: 50
	              },
	             header: () => <AppInputImageHeader r = {route} title="AstroRide" subtitle="Add Name"  sml={10}/>,
	             //headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                />
				<Stack.Screen
                  name="AddLogin"
	              component={AddLoginScreen}
				   options={({route}) => ({
				  headerStyle: {
		            backgroundColor: "#000",
		            height: 50
	              },
	             header: () => <AppInputImageHeader r = {route} title="AstroRide" subtitle="Email and password"  sml={10}/>,
	             //headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}	 
                />
                </Stack.Navigator>
);

export default AuthStack;
