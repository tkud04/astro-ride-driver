import React from 'react';
import styled from 'styled-components';
import CStatusBar from '../components/CStatusBar';
import CustomButton from '../components/CustomButton';
import * as helpers from '../Helpers';
import {ScrollView} from 'react-native';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class TestScreen extends React.Component { 
   static navigationOptions = {
       drawerLabel: 'Products'
	   
	  };

  state = {
	userCook: "",
	activeUser: ""
  };

  render() {
    return (
	        <Container>
			  <ScrollView>
			     <NavButton onPress={() => (this.props.navigation.navigate('Test'))} title="Go to Test screen"></NavButton>
			     <Title>This component is styled using styled-components</Title>
			     <CustomButton text="Click me" textColor="#01d1e5" backgroundColor="lavenderblush"/>
			  </ScrollView>
			</Container>
    );
  }
  
}

const Container = styled.View`
                     flex: 1;
					 background-color: papayawhip;
					 justify-content: center;
					 align-items: center;
`;

const Title = styled.Text`
                     font-size: 24;
					 font-weight: 500;
					 color: palevioletred;
`;

const NavButton = styled.Button``;
