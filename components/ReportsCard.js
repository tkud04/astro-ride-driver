import React from 'react';
import styled from 'styled-components';
import {SvgXml} from 'react-native-svg';
import * as helpers from '../Helpers';
import CButton from './CButton';

let naira = '\x8358';
let ml = "20px";


const ReportsCard = props => {
return(
<SubmitButton
onPress={() =>{
			let navv = props.navv;
			navv.navigate('ReportsDatePicker',{
		     reportsType : props.rt
	        });  
		}}
      >
<Container>
   
   <Row style={{}}>  
       <DaysText>{props.title}</DaysText>					   
	</Row>
</Container>
</SubmitButton>
);
}

export default ReportsCard;

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
				  background-color: green
				  justify-content: center;
				  align-items: center;
				  padding-bottom: 5px;
				  
`;

const SubmitButton = styled.TouchableOpacity`
              width: 100%;
			  height: 100%;

`;

const DaysText = styled.Text`
             color: #fff;
			 font-weight: 500;
			 font-family: sans-serif;
			 font-size: 20px;
			 text-align: center;
			 padding-top: 10px;
			 padding-bottom: 10px;
`;

const Row = styled.View`
   margin: 5px;
   width: 100%;
   flex-direction: row;
   justify-content: center;
   align-items: center;
`;