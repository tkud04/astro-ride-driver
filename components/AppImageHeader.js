import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import HeaderMenuButton from './HeaderMenuButton';
import * as helpers from '../Helpers';


const AppImageHeader = props => {
return (
<Container>
<BackgroundImage source={require('../assets/images/header.jpg')}>
</BackgroundImage>
<OverlayView pointerEvents="none"></OverlayView>
<HeaderView>
  <ButtonsView>
  <MenuButton onPress={props.navv.getParam(props.leftParam)} style={{marginLeft: 15}}>
		  <HeaderMenuButton xml={AppStyles.svg.headerBack} w={30} h={30} ss={{marginLeft: 10, alignSelf: 'flex-start'}}/>
		</MenuButton>
	<SvgView>
     <SvgIcon xml={helpers.insertAppStyle(props.xml)} w={60} h={40}/>
	   <Title style={{fontSize: 12}}>{props.title}</Title>
  </SvgView>
    <MenuButton onPress={props.navv.getParam(props.rightParam)}>
		  <HeaderMenuButton xml={AppStyles.svg.headerPlus} w={30} h={30} ss={{marginRight: 40, alignSelf: 'flex-start'}}/>
		</MenuButton>
  </ButtonsView>
  
  <TitleView>
  <Title>{props.subtitle}</Title>
  </TitleView>
</HeaderView>  

</Container>
)
};

export default AppImageHeader;

const Container = styled.View`

`;

const BackgroundImage = styled.ImageBackground`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;

           width: 100%;
		   height: 100%;
`;

const Title = styled.Text`
 font-size: 24;
 font-family: ${AppStyles.fontFamily};
 color: ${AppStyles.headerColor};
`;

const HeaderView = styled.View`
flex-direction: column;
margin-left: 10;
 justify-content: flex-start;
 align-items: flex-start;
`;

const ButtonsView = styled.View`
flex-direction: row;
justify-content: space-evenly;
margin-top: 10px;
 
`;

const SvgView = styled.View`
 width: 100%;
align-items: center;
margin-top: -5;
margin-left: -10;
`;

const TitleView = styled.View`
margin-top: 100px;
align-items: center;
justify-content: center;
margin-left: 20;
margin-bottom: 5px;
 
`;

const MenuButton = styled.TouchableOpacity`

`;

const OverlayView = styled.View`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(0,100,0,0.5);
`;
