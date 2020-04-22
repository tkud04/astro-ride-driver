import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import HeaderMenuButton from './HeaderMenuButton';
import {useNavigation} from '@react-navigation/native';
import * as helpers from '../Helpers';



const AppInputImageHeader = props => {
	//console.log("r: ",props.r);
	
	const navv = useNavigation();
	
return (
<Container>
<BackgroundImage source={require('../assets/images/header.jpg')}>
</BackgroundImage>
<OverlayView pointerEvents="none"></OverlayView>
<HeaderView>
  <ButtonsView>
  <MenuButton onPress={() => {console.log("pressing.."); navv.goBack()}} style={{marginLeft: 15}}>
		  <HeaderMenuButton xml={AppStyles.svg.headerBack} w={30} h={30} ss={{marginLeft: 10, alignSelf: 'flex-start'}}/>
		</MenuButton>
	<SvgView>
    {
		props.xml && <SvgIcon xml={helpers.insertAppStyle(props.xml)} w={60} h={40}/>
	}
	   <Title style={{fontSize: 12}}></Title>
  </SvgView>
  </ButtonsView>
  
  <TitleView sml={props.sml}>
  <Title>{props.subtitle}</Title>
  </TitleView>
</HeaderView>  

</Container>
)
};

export default AppInputImageHeader;

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
margin-left: 10;
margin-top: 10;
 justify-content: flex-start;
 align-items: flex-start;
`;

const ButtonsView = styled.View`
flex-direction: row;
justify-content: space-evenly;
margin-top: 15px;
 
`;

const SvgView = styled.View`
 width: 100%;
align-items: center;
margin-top: -5;
margin-left: -10;
`;

const TitleView = styled.View`
margin-top: 75px;
align-items: center;
justify-content: center;
margin-left: ${props => props.sml};
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
background-color: rgba(101, 33, 33,0.5);
height: ${AppStyles.headerHeight - 20};
`;
