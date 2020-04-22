import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import {showMessage, hideMessage} from 'react-native-flash-message';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

_launchDrawer = () => {
	showMessage({
			 message: "Launching drawer menu",
			 type: 'success'
		 })	 
}

export default class DrawerMenuButton extends React.Component { 

 constructor(props) {
    super(props);
    this.state = { text: '', loading: false,dataSource: []};		 
  }


  render() {
	  let items = [];
	 // let navv = this.props.navigation;
		 //console.log(items);
		 
    return (
	        <Btn onPress={this.props.onPress}>
              <SvgView>
                <SvgIcon xml={insertAppStyle(this.props.xml)} w={this.props.w} h={this.props.h}/>
              </SvgView>
            </Btn>  
        );
  }
  
}

const Btn = styled.TouchableOpacity`

`;

const SvgView = styled.View`
 margin-left: 3px;
`;