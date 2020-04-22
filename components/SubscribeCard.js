import React from 'react';
import styled from 'styled-components';
import {SvgXml} from 'react-native-svg';
import * as helpers from '../Helpers';
import CButton from './CButton';

let naira = '\x8358';
let ml = "20px";


const SubscribeCard = props => {
pkg = props.pkg;
//console.log(`ml before": ${ml}`);
return(
<Container>
   <Row style={{borderBottomWidth: 1,borderColor: '#adacac'}}> 
      <DaysText>{pkg.name}</DaysText>    	 
   </Row>
   <Row style={{flexDirection: 'column', borderBottomWidth: 1,borderColor: '#adacac'}}> 
     <PriceText>{pkg.price}</PriceText>    	   	 
     <SavedText>Save {pkg.saved}!</SavedText>    	   	 
   </Row>
   <Row> 
      <SubmitButton
		onPress={() =>{
			let navv = props.navv;
			navv.navigate('Package',{
		     pkg : props.pkg
	        });  
		}}
      >
         <CButton title="Subscribe" background="green" color="#fff" />					   
	  </SubmitButton>
	</Row>
</Container>
);
}

export default SubscribeCard;

const Container = styled.View`
				  border-radius: 10px;
				  border-color: #ccc;
				  border-width: 1;
				  margin-vertical: 20px;
				  margin-horizontal: 15px;
				  shadow-color: #000;
				  shadow-offset: 5px 10px;
				  shadow-opacity: 0.8;
				  shadow-radius: 10px;
				  justify-content: center;
				  align-items: center;
				  padding-bottom: 5px;
				  
`;

const SubmitButton = styled.TouchableOpacity`
              width: 100%;
			  height: 100%;

`;

const DaysText = styled.Text`
             color: green;
			 font-weight: 500;
			 font-family: sans-serif;
			 font-size: 20px;
			 text-align: center;
			 padding-top: 10px;
			 padding-bottom: 10px;
`;

const PriceText = styled.Text`
             color: black;
			 font-weight: 500;
			 font-family: sans-serif;
			 font-size: 20px;
			 text-align: center;
			 padding-bottom: 3px;
`;

const SavedText = styled.Text`
             color: #adacac;
			 font-weight: 200;
			 font-family: sans-serif;
			 font-size: 16px;
			 text-align: center;
			 padding-bottom: 3px;
`;

const Row = styled.View`
   margin: 5px;
   width: 100%;
   flex-direction: row;
   justify-content: center;
   align-items: center;
`;