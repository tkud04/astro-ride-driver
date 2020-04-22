import React from 'react';
import styled from 'styled-components';
import {SvgXml} from 'react-native-svg';
import * as helpers from '../Helpers';

let naira = '\x8358';
let ml = "20px";


const Card = props => {
ml = props.ml;
//console.log(`ml before": ${ml}`);
return(
<Container>
    <HomeButton
	    onPress={() =>{
			let navv = props.navv;
			navv.navigate(props.title);
		}}
	  >
	  
   <Cover ml={props.ml} mt={props.mt}> 
      <SvgXml xml={helpers.insertAppStyle(props.xml)} fill="white" width={props.w} height={props.h} />     	 
   </Cover>
   <Content cmt={props.cmt}>
     <Title>{props.title}</Title>
   </Content>
    </HomeButton>
</Container>
);
}

export default Card;

const Container = styled.View`
				  height: 120px;
				  width: 120px;
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

const Cover = styled.View`
              width: 100%;
			  height:90px;
			  margin-left: ${props => props.ml};
			  margin-top: ${props => props.mt};
			  overflow: hidden;
`;

const HomeButton = styled.TouchableOpacity`
              width: 100%;
			  height: 100%;

`;

const Image = styled.Image`
              width: 100%;
			  height: 100%;
`;

const Content = styled.View`
			 align-items: center;
			 justify-content: center;
			 margin-top: ${props => props.cmt};
			 margin-bottom: 5px;
`;

const Title = styled.Text`
             color: #555;
			 font-weight: 500;
			 font-family: sans-serif;
			 font-size: 15px;
			 text-align: center;
			 padding-bottom: 5px;
			
`;