import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import * as helpers from '../Helpers';

const HeaderMenuButton = props => (
  <SvgView style={props.ss}>
    	<SvgIcon xml={helpers.insertAppStyle(props.xml)} w={props.w} h={props.h}/>
 </SvgView>
);

export default HeaderMenuButton;

const SvgView = styled.View`
				   justify-content: center;
				   align-items: center;
`;
