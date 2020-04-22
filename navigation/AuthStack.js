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
		            backgroundColor: AppStyles.headerBackground,
		            height: AppStyles.headerHeight
	              },
	             header: () => <AppHomeHeader xml={AppStyles.svg.headerPhone}  r = {route} title="Sign up" subtitle="Enter phone number"  sml={40}/>,
	             headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                /> 
				<Stack.Screen
                  name="VerifyNumber"
	              component={VerifyNumberScreen}
				  options={({route}) => ({
					headerStyle: {
		            backgroundColor: AppStyles.headerBackground,
		            height: AppStyles.headerHeight
	              },
	             header: () => <AppInputImageHeader xml={AppStyles.svg.headerPhone}  leftParam = "goBack" r = {route} title="Sign up" subtitle="Verify phone number"  sml={30}/>,
	             headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                /> 
				<Stack.Screen
                  name="UserLogin"
	              component={UserLoginScreen}
				  options={({route}) => ({
					headerStyle: {
		            backgroundColor: AppStyles.headerBackground,
		            height: AppStyles.headerHeight
	              },
	             header: () => <AppInputImageHeader xml={AppStyles.svg.headerPhone}  leftParam = "goBack" r = {route} title="Sign up" subtitle="Login"  sml={30}/>,
	             headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                /> 
				<Stack.Screen
                  name="AddName"
	              component={AddNameScreen}				  
				  //initialParams={{goBack: () => {this.props.navigation.goBack()}}}
				  options={({route}) => ({
					headerStyle: {
		            backgroundColor: AppStyles.headerBackground,
		            height: AppStyles.headerHeight
	              },
	             header: () => <AppInputImageHeader xml={AppStyles.svg.headerPhone}  leftParam = "goBack" r = {route} title="Sign up" subtitle="What's your name?"  sml={30}/>,
	             headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                />
				<Stack.Screen
                  name="AddLogin"
	              component={AddLoginScreen}
				  options={({route}) => ({
					headerStyle: {
		            backgroundColor: AppStyles.headerBackground,
		            height: AppStyles.headerHeight
	              },
	             header: () => <AppInputImageHeader xml={AppStyles.svg.headerPhone}  leftParam = "goBack" r = {route} title="Sign up" subtitle="Email and password"  sml={30}/>,
	             headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}	 
                />
                </Stack.Navigator>
);

export default AuthStack;
