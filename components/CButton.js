import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import * as helpers from '../Helpers';


const CButton = props => (
<ParentView>
<ButtonView background={props.background}>
	<ButtonText color={props.color}>{props.title}</ButtonText>
</ButtonView>
</ParentView>
);

export default CButton;


const ButtonView = styled.View`
  background-color: ${props => props.background};
  border-radius: 5;
  width: 80%;
  padding: 10px;
  align-items: center;
`;

const ParentView = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const ButtonText = styled.Text`
  color: ${props => props.color};
  
`;