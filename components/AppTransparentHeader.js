import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import HeaderMenuButton from './HeaderMenuButton';
import * as helpers from '../Helpers';
import {useNavigation} from '@react-navigation/native';


const AppTransparentHeader = props => {
		//console.log("r: ",props.r);
		const navv = useNavigation();
		
return (
<Container>
<HeaderView>
  <ButtonsView>
  <MenuButtonView>
  <MenuButton onPress={() => { navv.toggleDrawer()}}>
	 <HeaderMenuButton xml={AppStyles.svg.headerBlackHamburger} w={30} h={30} ss={{marginTop: 10, marginLeft: 20, alignSelf: 'flex-start'}}/>
  </MenuButton>
  </MenuButtonView>
  <EarningsView>
   <EarningsText>₦0.00</EarningsText>
  </EarningsView>
  <MenuButtonView>
  <MenuButton onPress={() => { navv.toggleDrawer()}} style={{alignSelf: 'flex-end'}}>
	 <HeaderMenuButton xml={AppStyles.svg.ionSearch} w={30} h={30} ss={{marginTop: 10, marginRight: 20, alignSelf: 'flex-end'}}/>
  </MenuButton>
  </MenuButtonView>
  </ButtonsView>
</HeaderView>  
</Container>
)
};

export default AppTransparentHeader;

const Container = styled.View`

`;

const BackgroundImage = styled.ImageBackground`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;

           width: 100%;
		   height: ${AppStyles.headerHeight - 20};
`;

const Title = styled.Text`
 font-size: 24;
 font-family: ${AppStyles.fontFamily};
 color: ${AppStyles.headerColor};
`;

const HeaderView = styled.View`
flex-direction: column;
 justify-content: space-between;
 align-items: flex-start;

`;

const ButtonsView = styled.View`
flex-direction: row;
justify-content: space-between;
margin-top: 20px;
width: 100%;
 
`;

const SvgView = styled.View`
 width: 100%;
align-items: center;
margin-top: 5;
margin-left: -10;
`;

const TitleView = styled.View`
margin-top: 75px;
margin-left: ${props => props.sml}px;
align-items: center;
justify-content: center;
 
`;

const MenuButton = styled.TouchableOpacity`

`;

const MenuButtonView =  styled.View`

`;

const OverlayView = styled.View`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: rgba(101, 33, 33,0.5);
height: ${AppStyles.headerHeight - 20};
`;

const EarningsView = styled.View`
flex-direction: row;
background-color: black;
border-radius: 20;
width: 30%;
margin-top: 10;
paddingVertical: 5;
align-items: center;
justify-content: center;
`;

const EarningsText = styled.Text`
color: #fff;
font-size: 20;
`;

