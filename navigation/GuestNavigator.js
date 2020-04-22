import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import AuthStack from './AuthStack';

/////////////////////////////////////////////////

let user = {};


let userMenu = {
    Welcome: {
		screen: AuthStack,
		navigationOptions: (navigation) => ({
			headerShown: false
		})
	}
  }	

const GuestNavigator = createStackNavigator(userMenu);

export default GuestNavigator;
