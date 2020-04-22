import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppHomeHeader from '../components/AppHomeHeader';
import AppTransparentHeader from '../components/AppTransparentHeader';
import AppTransparentInputHeader from '../components/AppTransparentInputHeader';
import AppStyles from '../styles/AppStyles';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AddLocationScreen from '../screens/AddLocationScreen';
import AddLocationMapScreen from '../screens/AddLocationMapScreen';
import SetDestinationScreen from '../screens/SetDestinationScreen';
import SetDestinationMapScreen from '../screens/SetDestinationMapScreen';
import ConfirmRideScreen from '../screens/ConfirmRideScreen';
import AccountSettingsScreen from '../screens/AccountSettingsScreen';
import TestScreen from '../screens/TestScreen';


/////////////////////////////////////////////////

const Stack = createStackNavigator();


let AppStack = () => (
<Stack.Navigator>
				<Stack.Screen
                  name="Dashboard"
	              component={DashboardScreen}
				  options={({route}) => ({
				  headerTransparent: true,
	             header: () => <AppTransparentHeader xml={AppStyles.svg.chartBar}  r = {route} title="AstroRide" subtitle="Dashboard"  sml={100}/>,
	             //headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                />

                  <Stack.Screen
                  name="SetDestination"
	              component={SetDestinationScreen}
				  options={({route}) => ({
					headerTransparent: true,
				 header: () => <AppTransparentInputHeader xml={AppStyles.svg.headerPhone}  leftParam = "goBack"  r = {route} title="AstroRide" subtitle="Confirm ride"  sml={20}/>,
	             headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                /> 		
				<Stack.Screen
                  name="SetDestinationMap"
	              component={SetDestinationMapScreen}
				  options={({route}) => ({
					headerTransparent: true,
				 header: () => <AppTransparentInputHeader xml={AppStyles.svg.headerPhone}  leftParam = "goBack"  r = {route} title="AstroRide" subtitle="Confirm ride"  sml={20}/>,
	             headerLeft: null  
				  })}
	              
                /> 		
				<Stack.Screen
                  name="ConfirmRide"
	              component={ConfirmRideScreen}
				  options={({route}) => ({
					  headerTransparent: true,
				
	             header: () => <AppTransparentInputHeader xml={AppStyles.svg.headerPhone}  leftParam = "goBack"  r = {route} title="AstroRide" subtitle="Confirm ride"  sml={40}/>,
	             headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                /> 		
				<Stack.Screen
                  name="Profile"
	              component={ProfileScreen}
				  options={({route}) => ({
					headerStyle: {
		            backgroundColor: AppStyles.headerBackground,
		            height: AppStyles.headerHeight - 200
	              },
	             header: () => <AppInputImageHeader r = {route} title="AstroRide" subtitle="Profile" sml={10}/>,
	             headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                /> 	
				<Stack.Screen
                  name="AddLocation"
	              component={AddLocationScreen}
				  options={({route}) => ({
					headerStyle: {
		            backgroundColor: AppStyles.headerBackground,
		            height: AppStyles.headerHeight - 200
	              },
	             header: () => <AppInputImageHeader r = {route} title="AstroRide" subtitle="" sml={10}/>,
	             headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                /> 
				<Stack.Screen
                  name="AddLocationMap"
	              component={AddLocationMapScreen}
				  options={({route}) => ({
					headerStyle: {
		            backgroundColor: AppStyles.headerBackground,
		            height: AppStyles.headerHeight - 200
	              },
	             header: () => <AppInputImageHeader r = {route} title="AstroRide" subtitle="" sml={10}/>,
	             headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                /> 		
				
				<Stack.Screen
                  name="AccountSettings"
	              component={AccountSettingsScreen}
				  options={({route}) => ({
					headerStyle: {
		            backgroundColor: AppStyles.headerBackground,
		            height: AppStyles.headerHeight - 200
	              },
	             header: () => <AppInputImageHeader r = {route} title="AstroRide" subtitle="Account Settings" sml={10}/>,
	             headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                /> 		
				<Stack.Screen
                  name="Test"
	              component={TestScreen}
				  options={({route}) => ({
					headerStyle: {
		            backgroundColor: AppStyles.headerBackground,
		            height: AppStyles.headerHeight - 200
	              },
	             header: () => <AppInputImageHeader r = {route} title="AstroRide" subtitle="Test" sml={10}/>,
	             headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                /> 		
					
				
                </Stack.Navigator>
);

export default AppStack;
