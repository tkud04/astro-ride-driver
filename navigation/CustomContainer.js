import React,{useContext} from 'react';
import { View } from 'react-native';
import {ThemeContext,UserContext} from '../MyContexts';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';
import GuestNavigator from './GuestNavigator';
import NavigationService from './NavigationService';
import * as helpers from '../Helpers';

export default class CustomContainer extends React.Component {
	constructor(props) { 
      super(props);
	  this.state = {
	    uuu: {},
		lli: false,
		isLoadingComplete: false,
	  };
		
	  helpers.getLoggedInUser().then((dt) => {
			  this.state.uuu = dt;
			  this.state.lli = (Object.keys(dt).length === 0);
			  this.state.isLoadingComplete = true;
			  console.log('User in customcontainer ctor: ',this.state.uuu);
			  console.log("loading complete ctor: ",this.state.isLoadingComplete);
		 });
		 
    }
	
	
	_getContainer = (uu,upp,lli) => {
		      let kl = Object.keys(this.state.uuu).length;
			  console.log("keys length: ",kl);
		       this.state.lli = (kl === 5);
			    console.log('User and lli from  _getContainer: ',[this.state.uuu,this.state.lli]);
			  let mnav = null;
			 // mnav = (this.state.lli) ? AppNavigator: GuestNavigator;
			  mnav = AppNavigator;
		      //console.log(Object.keys(uu).length);
	       	  //let mnav = (uu.name === "Guest") ? GuestNavigator : AppNavigator;
		      const AppContainer = createAppContainer(mnav);
		     return (
		       <AppContainer
			    ref={navigatorRef => {
                      NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
			   />
		     );	 
		
		}
	
	render(){
		console.log("loading complete: ",this.state.isLoadingComplete);
		if(this.state.isLoadingComplete){
			return (
                <ThemeContext.Consumer>
                  {theme => (
                    <UserContext.Consumer>
                      {({user,up,loggedIn}) => {
	                     return this._getContainer(user,up,loggedIn);
                        }}
                    </UserContext.Consumer>
                  )}
                </ThemeContext.Consumer>		             				         
            );
		
		}
		else{
			 helpers.getLoggedInUser().then((dt) => {
			  this.state.uuu = dt;
			  this.state.lli = (Object.keys(dt).length === 0);
			   this.setState({ isLoadingComplete: true });
			  console.log('User in customcontainer render: ',this.state.uuu);
			  console.log("loading complete render: ",this.state.isLoadingComplete);
		 });
		 
			return (
			<View></View>
			);
		}
	}
}

