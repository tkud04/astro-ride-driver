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
import InboxStack from './navigation/InboxStack';
import EarningsStack from './navigation/EarningsStack';
import PromotionsStack from './navigation/PromotionsStack';
import WalletStack from './navigation/WalletStack';
import AppHomeHeader from './components/AppHomeHeader';
import SvgIcon from './components/SvgIcon';
import AstroIcon from './components/AstroIcon';
import SignoutScreen from './screens/SignoutScreen';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import { Notifications } from 'expo';
import * as TaskManager from 'expo-task-manager';
import FlashMessage from 'react-native-flash-message';
import {ThemeContext,UserContext} from './MyContexts.js';
import AppIntroSlider from 'react-native-app-intro-slider';



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


const slides = [
  {
    key: 1,
    title: "Be Your Own Boss",
    text: "Make money driving on your own time",
    image: require('./assets/images/intro-1.jpg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: "Know Your Next Move",
    text: "Get notified when you're in a busy area",
    image: require('./assets/images/intro-2.jpg'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: "View Your Earnings Real-time",
    text: "Explore your daily and weekly earnings with just a click",
    image: require('./assets/images/intro-3.jpg'),
    backgroundColor: '#22bcb5',
  }
];


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
	loggedIn: false,
	showApp: true
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
  
   this.ss = {color: "#fff", backgroundColor: "#000", paddingVertical: 5, borderRadius: 10};
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
  
 _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
  
  _onDone = () => {
	  this.setState({showApp: true});
  };
  
   _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ion
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ion
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
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
		 {this.state.showApp ? (
		   <ThemeContext.Provider>
		     <UserContext.Provider value={this.state}>			
		       <NavigationContainer ref={navigationRef}>
			    <Drawer.Navigator initialRouteName='Dashboard' drawerContent={props => (<CustomDrawerComponent {...props}/>)}>
				   {this.state.loggedIn ? (
				   <>
				    <Drawer.Screen name="Dashboard" component={AppStack} options={{drawerIcon: () => <AstroIcon xml={AppStyles.svg.ionHome} w={40} h={20} ss={this.ss}/>}} />
				    <Drawer.Screen name="Inbox" component={InboxStack} options={{drawerIcon: () => <AstroIcon xml={AppStyles.svg.ionMail} w={40} h={20} ss={this.ss}/>}} />
				    <Drawer.Screen name="Promotions" component={PromotionsStack} options={{drawerIcon: () => <AstroIcon xml={AppStyles.svg.ionHome} w={40} h={20} ss={this.ss}/>}} />
				    <Drawer.Screen name="Earnings" component={EarningsStack} options={{drawerIcon: () => <AstroIcon xml={AppStyles.svg.ionCash} w={40} h={20} ss={this.ss}/>}} />
				    <Drawer.Screen name="Wallet" component={WalletStack} options={{drawerIcon: () => <AstroIcon xml={AppStyles.svg.ionWallet} w={40} h={20} ss={this.ss}/>}} />
				     <Drawer.Screen name="Sign out" component={SignoutStack} options={{drawerIcon: () => <AstroIcon xml={AppStyles.svg.cardSignOut} w={40} h={20} ss={this.ss}/>}} />
					</>
				   ) : (
				    <Drawer.Screen name="Sign in" component={AuthStack} options={{drawerIcon: () => <AstroIcon xml={AppStyles.svg.ionLoginOutline} w={40} h={20} ss={this.ss}/>}} />
				   )}
           
                </Drawer.Navigator>
			   </NavigationContainer>
		     </UserContext.Provider>
		  </ThemeContext.Provider>
		 ) : (
		   <AppIntroSlider 
		   renderItem={this._renderItem} 
		   data={slides} 
		   onDone={this._onDone}
		   renderDoneButton={this._renderDoneButton}
           renderNextButton={this._renderNextButton}
		   />
		 )}
		 
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
  slide: {
	  
  }
});
