import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import * as helpers from '../Helpers';


const AppHeader = props => {
	console.log(props.src);
	return (
<HeaderView>
 <BackgroundImage source={{uri: props.src}}/>

  <TitleView>
  <Title>{props.title}</Title>
  </TitleView>
</HeaderView>  
);

}

export default AppHeader;

const BackgroundImage = styled.Image`
width: 100%;
height: 100%;
`;

const Title = styled.Text`
 font-size: 24;
 font-family: ${AppStyles.fontFamily};
 margin-top: 5px;
 margin-left: 10px;
 margin-bottom: 30px;
 color: ${AppStyles.headerColor};
`;

const HeaderView = styled.View`
flex-direction: column;
`;

const SvgView = styled.View`
 margin-left: 20px;
 margin-top: 60px;
 width: 100%;
`;

const TitleView = styled.View`

`;