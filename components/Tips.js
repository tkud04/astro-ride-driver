import React from 'react';
import styled from 'styled-components';
import {FontAwesome} from '@expo/vector-icons';
import AppStyles from '../styles/AppStyles';


const Tips = props => (
<TipsBar>
    <Tip>Tip: Swipe right to open the menu.</Tip>			             				         
</TipsBar>
);

export default Tips;

const TipsBar = styled.View`
                     width: 100%;
					 margin-top: 10px;
					 margin-bottom: 20px;
					 margin-left: 3px;
					 flex-direction: row;
					 background-color: orange;					 
					 font-weight: 300;
`;


const Tip = styled.Text`
                     font-size: 14;					 
					 margin: 5px;
					 color: #fff;
					 font-style: ${AppStyles.fontStyle};
`;
