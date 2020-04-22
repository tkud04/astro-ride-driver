import React from 'react';
import {ScrollView, Button} from 'react-native';
import styled from 'styled-components';
import Card from '../components/Card';
import AppHomeHeader from '../components/AppHomeHeader';
import CButton from '../components/CButton';
import * as helpers from '../Helpers';
import {SvgXml} from 'react-native-svg';
import AppStyles from '../styles/AppStyles';
import {showMessage, hideMessage} from 'react-native-flash-message';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');



export default class GuestScreen extends React.Component { 

 constructor(props) {
    super(props);
    this.state = { text: '', loading: false,dataSource: []};
	this.navv = null;
  }
  

static navigationOptions = {
    header: null,
  };

_continue = () => {
		/**
		showMessage({
			 message: `Going to add phone number screen!`,
			 type: 'info'
		 });
		 **/
		 
		 this.navv.navigate('AddNumber');  
}
_continueSocial = () => {
		showMessage({
			 message: `Going to social screen!`,
			 type: 'info'
		 });
}


  render() {
	  let items = [];
	  let navv = this.props.navigation;
	  this.navv = navv;
		 
    return (
	        <Container>
					   <Column1>					   
					      <LogoView>						   
						    <Logo>
							  <LogoIcon>
							     <SvgXml xml={helpers.insertAppStyle(AppStyles.svg.logoCar)} fill="black" width={50} height={50} /> 
							  </LogoIcon>
							  <LogoText>AstroRide</LogoText>
							</Logo>
						  </LogoView>
					      <PhoneView>
						    <PhoneHeaderView>
						      <PhoneHeader>Enter your phone number</PhoneHeader>
							</PhoneHeaderView>
							<ContinueButton
							style={{width: '100%'}}
					          onPress={() => {this._continue()}}
					        >
						      <CButton title="Click here" background="rgb(101, 33, 33)" color="#fff" />
							</ContinueButton>
						  </PhoneView>
						
					   </Column1>
					   <Column2>
					    <ContinueButton
							style={{width: '100%'}}
					          onPress={() => {this._continueSocial()}}
					    >
					       <SocialView>
					         <SocialText>Or connect with social</SocialText>
						   </SocialView>
						</ContinueButton>
					   </Column2>
			</Container>
    );
  }
  
}

const Container = styled.View`
                     flex: 1;
					 background-color: white;	
                     border-radius: 20px;					 
`;



const PhoneHeader = styled.Text`
                     font-size: 24;
					 font-weight: 500;
					 color: #000;
					 marginTop: 10;
`;


const LogoText = styled.Text`
                     font-size: 23;
					 font-weight: bold;
					 color: #444;
`;

const SocialText = styled.Text`
                     font-size: 15;
					 color: rgb(101, 33, 33);
					 margin-left: 10px;
`;


const MainView = styled.View`
				 height: 100%;
`;


const SocialView = styled.View`
				 
`;

const PhoneHeaderView = styled.View`
	margin-bottom: 20;			 
`;


const LogoView = styled.View`
               	 background-color: rgb(101, 33, 33);
                 flex: 2;
				 align-items: center;
                 justify-content: center;
`;

const LogoIcon = styled.View`

`;

const Logo = styled.View`
               	 background-color: #fff;
                 width: 40%;
                 height: 40%;
				 border-radius: 33px;
                 align-items: center;
                 justify-content: center;				 
`;

const PhoneView = styled.View`
               	flex: 1;
			    align-items: center;				
`;

const Column1 = styled.View`
                 flex: 7;
`;

const Column2 = styled.View`
                 flex: 1;
`;


const NavButton = styled.Button``;

const ContinueButton = styled.TouchableOpacity`

`;

