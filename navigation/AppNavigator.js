import React from 'react';
import { Platform } from 'react-native';

import { createDrawerNavigator } from '@react-navigation/drawer';

import CustomDrawerComponent from '../components/CustomDrawerComponent';
import SvgIcon from '../components/SvgIcon';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';

import AppStack from './AppStack';


/////////////////////////////////////////////////

let user = {};

let userMenu = {};

userMenu = {
    Dashboard: {
		screen: AppStack,
		navigationOptions:{
			drawerIcon: <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardArea)} w={40} h={20}/>    
		}
	},
	/**
	Profile: {
		screen: ProfileStack,
		navigationOptions:{
			drawerIcon: <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardUsers)} w={40} h={20}/>    
		}
	},
	
	Subscribe: {
		screen: SubscribeStack,
		navigationOptions:{
			drawerIcon: <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardWallet)} w={40} h={20}/>    
		}
	},
	'Sign out': {
		screen: SignoutStack,
		navigationOptions:{
			drawerIcon: <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardUsers)} w={40} h={20}/>    
		}
	},
	Support: {
		screen: SupportStack,
		navigationOptions:{
			drawerIcon: <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardLightbulb)} w={40} h={20}/>    
		}
	},
	**/
  }

const Drawer = createDrawerNavigator();

/**
  userMenu,
  {
	  initialRouteName: 'Dashboard',
	  contentComponent: ,
	  /**contentOptions:{
		items: () =>  
	  },**/
/**	  drawerOpenRoute: 'DrawerOpen',
	  drawerCloseRoute: 'DrawerClose',
	  drawerToggleRoute: 'DrawerToggle',
  }
**/

let AppNavigator = () => (
<Drawer.Navigator  initialRouteName: 'Dashboard' drawerContent={props => (<CustomDrawerComponent {...props}/>)}>
<Drawer.Screen name="Dashboard" component={AppStack} options={{drawerIcon: <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardArea)} w={40} h={20}/> }}/>
</Drawer.Navigator>
);

export default AppNavigator;
