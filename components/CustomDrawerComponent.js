import React from 'react';
import {View,ScrollView, Button,SafeAreaView,TouchableNativeFeedback} from 'react-native';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import * as helpers from '../Helpers';
import * as RootNavigation from '../RootNavigation.js';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {ThemeContext,UserContext} from '../MyContexts';



let uu = {};

_getName = (u) =>{
	let r = "Guest";
	if(u.fname && u.lname) r = `${u.fname} ${u.lname}`;
	return r;
}
_getEmail = (u) =>{
	let r = "Sign in";
	if(u.email) r = u.email; 
	return r;
}

_goToProfile = (u) =>{
	console.log("u: ", u);
	RootNavigation.navigate('Profile', { u: u });
}
const ripple = TouchableNativeFeedback.Ripple('#adacac', false);
const CustomDrawerComponent = props => {
	
  //const navv = useNavigation();
  return (
  <ThemeContext.Consumer>
             {theme => (
               <UserContext.Consumer>
			   {({user,up,loggedIn}) => {
				   helpers.getLoggedInUser().then((dt) => {
					   
		 });
		    return (
			    <DrawerContentScrollView {...props}>
				
				  <ProfileButton
			  onPress={() => {_goToProfile(user)}}
			 >
            <View style={{ backgroundColor: AppStyles.themeColor , marginTop: -5}}>
              <View style={{ marginLeft: 5, marginBottom: 5, marginTop: 0}}>
			    <Logo source={require('../assets/images/bg.jpg')}/>
				<Username style={{ color: '#f9f9f9', marginTop: 5, marginLeft: '5%', fontFamily: 'sans-serif-condensed' }}>{`${_getName(user)}`}</Username>
				<Email style={{ color: '#f9f9f9', marginTop: 5, marginLeft: '5%', fontFamily: 'sans-serif-condensed' }}>{`${_getEmail(user)}`}</Email>
              </View>
            </View>
			</ProfileButton>
				
				  <DrawerItemList {...props}/>
				  
				  <View elevation={6} style={{ backgroundColor: '#ffffff' }}>
          <TouchableNativeFeedback background={ripple}>
            <FooterItem>
              <SvgIcon xml={AppStyles.svg.cardUsers} w="10%" h="10%"/>
              <FooterItemText style={{ fontFamily: 'sans-serif-medium' }}>Support</FooterItemText>
            </FooterItem>
          </TouchableNativeFeedback>
        </View>
		
			    </DrawerContentScrollView>
			
			);
			   }}
			  </UserContext.Consumer>
              )}
             </ThemeContext.Consumer>
)
};

export default CustomDrawerComponent;


const Username = styled.Text`
font-size: 15;
`;

const Email = styled.Text`
margin-bottom: 5px;
`;

const Divider = styled.View`
border-bottom-color: #adacac;
border-bottom-width: 1px;
`;

const FooterItem = styled.View`
flex-direction: row;
padding: 8px;
marginVertical: 10px;
`;

const FooterItemText = styled.Text`
color: black;
align-items: center;
justify-content: center;
margin-left: 5px;

`;

const SvgView = styled.View`
 margin-left: 20px;
 margin-right: 20px;
 margin-top: 60px;
 width: 100%;
 flex: 1;
`;

const Logo = styled.Image`
           width: 50px;
		   height: 50px;
		   background: black;
		   border-radius: 44px;
		   margin-top: 10px;
		   margin-left: 5px;
`;

const ProfileButton = styled.TouchableOpacity`

`;
