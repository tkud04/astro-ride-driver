import 'react-native-gesture-handler';

import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen, AppLoading } from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import * as helpers from './Helpers';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './RootNavigation';
import AppStyles from './styles/AppStyles';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerComponent from './components/CustomDrawerComponent';
import AppStack from './navigation/AppStack';
import TripsStack from './navigation/TripsStack';
import PaymentStack from './navigation/PaymentStack';
import AuthStack from './navigation/AuthStack';
import SignoutStack from './navigation/SignoutStack';
import AppHomeHeader from './components/AppHomeHeader';
import SvgIcon from './components/SvgIcon';
import SignoutScreen from './screens/SignoutScreen';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { Notifications } from 'expo';
import * as TaskManager from 'expo-task-manager';
import FlashMessage from 'react-native-flash-message';
import {ThemeContext,UserContext} from './MyContexts.js';



const LOCATION_TASK_NAME = 'background-location-task';
const Drawer = createDrawerNavigator();

const GUEST = {
	email: "",
    fname: "Welcome,",
    gender: "",
    id: "guest",
    lname: "Guest",
    password: "",
    to: "",
	tk: null
};

export default class App extends React.Component {
constructor(props){
	super(props);
	this.uuu = {};
    //this.hu = helpers.getLoggedInUser();	
	
	this.state = {
    isLoadingComplete: false,
    isLoggedIn: false,
    isRealLoadingComplete: false,
	user:  GUEST,
	ttk: null,
	up: this._updateUser,
	loggedIn: false
  };
  
   helpers.getLoggedInUser().then((dt) => {
			  this.state.user = (Object.keys(dt).length === 0) ? GUEST : dt;					  
			  this.state.isRealLoadingComplete = true;
			  this.state.isLoggedIn = true;
			  console.log("uu",this.state.user);
			  this.state.up([this.state.user]);	   
			 
		 });
  
	
  //this.resolve(this.hu);
  this.navv = null;
}
  
  _notificationSubscription = null;
  
  //this._notificationSubscription = Notifications.addListener(this._handleNotification);

  _handleNotification = (notification) => {
	   console.log(notification.origin);
	   console.log(JSON.stringify(notification.data));
    this.setState({notification: notification});
  };
  
  _updateUser = (u) => {
    let uuser = (Object.keys(u[0]).length === 0) ? GUEST : u[0];
    let tttk  = (u[1] === "test") ? "testTTK" : uuser.tk;
	let lloggedIn = (tttk !== null);
	this.setState({user: uuser,tk: tttk,loggedIn: lloggedIn});
	console.log("user context updated with ",[u,lloggedIn]);
  };

  render() {
   this.navv = this.props.navigation;
   //console.log("navv from App.js: ",this.navv);
    if (!this.state.isRealLoadingComplete && !this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
		//helpers.getLoggedInUser((u) => {this._updateUser(u)});
		
		 
		  return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
		  <ThemeContext.Provider>
		     <UserContext.Provider value={this.state}>			
		       <NavigationContainer ref={navigationRef}>
			    <Drawer.Navigator initialRouteName='Dashboard' drawerContent={props => (<CustomDrawerComponent {...props}/>)}>
				   {this.state.loggedIn ? (
				   <>
				    <Drawer.Screen name="Dashboard" component={AppStack} options={{drawerIcon: () => <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardHouse)} w={40} h={20}/>}} />
				    <Drawer.Screen name="Trips" component={TripsStack} options={{drawerIcon: () => <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.logoCar)} w={40} h={20}/>}} />
				    <Drawer.Screen name="Payment" component={PaymentStack} options={{drawerIcon: () => <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardWallet)} w={40} h={20}/>}} />
				    <Drawer.Screen name="Sign out" component={SignoutStack} options={{drawerIcon: () => <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardSignOut)} w={40} h={20}/>}} />
					</>
				   ) : (
				    <Drawer.Screen name="Sign in" component={AuthStack} options={{drawerIcon: () => <SvgIcon xml={helpers.insertAppStyle(AppStyles.svg.cardSignIn)} w={40} h={20}/>}} />
				   )}
           
                </Drawer.Navigator>
			   </NavigationContainer>
		     </UserContext.Provider>
		  </ThemeContext.Provider>
          <FlashMessage position="bottom" />
        </View>
      );	
    }
  }
 

  _loadResourcesAsync = async () => {
    return Promise.all([
      /**
	  Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
	  **/
      await Font.loadAsync({
        // This is the font that we are using for our tab bar
        //...Ionicons.font,
		//...FontAwesome.font
		'open-sans-regular': require('./assets/fonts/OpenSans-Regular.ttf')
      }),
    ]);
  };
  

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

/**
TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
	console.log("Error: ",error.message);
    return;
  }
  if (data) {
    const { locations } = data;
    // do something with the locations captured in the background
	console.log("Locations: ",locations);
  }
});
**/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
	fontFamily: 'Roboto'
  },
});
