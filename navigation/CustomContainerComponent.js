import React,{useContext} from 'react';
import {ThemeContext,UserContext} from '../MyContexts';
import * as helpers from '../Helpers';
import CustomContainer from './CustomContainer';


export default class CustomContainerComponent extends React.Component {
	constructor(props) {
      super(props);
	  this.state = {
	    uuu: {}
	  };
  
    }
	
	
	render(){
		return (
	    <CustomContainer/>		             				         
);
	}
}

