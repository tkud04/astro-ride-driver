import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppInputImageHeader from '../components/AppInputImageHeader';
import AppHomeHeader from '../components/AppHomeHeader';
import AppTransparentHeader from '../components/AppTransparentHeader';
import AppTransparentInputHeader from '../components/AppTransparentInputHeader';
import AppStyles from '../styles/AppStyles';
import InboxScreen from '../screens/InboxScreen';
import ReadMessageScreen from '../screens/ReadMessageScreen';



/////////////////////////////////////////////////

const Stack = createStackNavigator();


let InboxStack = () => (
<Stack.Navigator>
				<Stack.Screen
                  name="Inbox"
	              component={InboxScreen}
				  options={({route}) => ({
				  headerStyle: {
		            backgroundColor: "#000",
		            height: 50
	              },
	             header: () => <AppInputImageHeader r = {route} title="AstroRide" subtitle="Inbox"  sml={10}/>,
	             //headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                />
                 <Stack.Screen
                  name="ReadMessage"
	              component={ReadMessageScreen}
				  options={({route}) => ({
				  headerStyle: {
		            backgroundColor: "#000",
		            height: 50
	              },
	             header: () => <AppInputImageHeader r = {route} title="AstroRide" subtitle="Message"  sml={10}/>,
	             //headerTintColor: AppStyles.headerColor,
	             headerLeft: null  
				  })}
	              
                />

				
                </Stack.Navigator>
);

export default InboxStack;
