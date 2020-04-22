import React from 'react';
import styled from 'styled-components';
import {FontAwesome} from '@expo/vector-icons';
import AppStyles from '../styles/AppStyles';


const TitleHeader = props => (
<TitleBar bc={props.bc}>
    <Title tc={props.tc}>{props.title}</Title>			             				         
</TitleBar>
);

export default TitleHeader;

const TitleBar = styled.View`
                     width: 90%;
					 margin-top: 10px;
					 margin-bottom: 20px;
					 margin-left: 3px;
					 flex-direction: row;
					 border-color: ${props => props.bc};	
					 border-width: 1;	
                     border-radius: 5px;					 
					 padding: 7px;
					 align-items: center;
					 justify-content: center;
					 
`;


const Title = styled.Text`
                     font-size: 16;					 
					 margin: 5px;
					 color: ${props => props.tc};
					 font-style: ${AppStyles.fontStyle};
`;
