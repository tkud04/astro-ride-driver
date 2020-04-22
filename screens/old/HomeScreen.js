import React from 'react';
import {ScrollView, Button} from 'react-native';
import styled from 'styled-components';
import Categories from '../components/Categories';
import Card from '../components/Card';
import SvgIcon from '../components/SvgIcon';
import AppHeader from '../components/AppHeader';
import AppHomeHeader from '../components/AppHomeHeader';
import * as helpers from '../Helpers';
import AppStyles from '../styles/AppStyles';
import {showMessage, hideMessage} from 'react-native-flash-message';

import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');



export default class HomeScreen extends React.Component { 

 constructor(props) {
    super(props);
    this.state = { text: '', loading: false,dataSource: []};
    this.props.navigation.setParams({launchDrawer: this.launchDrawer});	
	this.navv = null;
  }
  
  launchDrawer = () => {
	this.navv.toggleDrawer();  
  }

static navigationOptions = ({navigation}) => {
	 
	  return {
       drawerLabel: 'Home',
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight    		   
	   },
	   headerTitle: () => <AppHomeHeader xml={AppStyles.svg.chartBar} navv = {navigation} title="Tembo" subtitle="Dashboard"/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
	   }
	  }
	  
	  };


  render() {
	  let items = [];
	  let navv = this.props.navigation;
	  this.navv = navv;
	  helpers.getList((dt => {
		  items = dt;
		 }));
		 //console.log(items);
		 
    return (
	        <Container>
			    <ScrollView>
			        <ItemsLayout>
					   <Column>
					       <Card w="50%" h="40%" ml="20px" mt="30px" cmt="-35px" xml={AppStyles.svg.cardStore} title="Products" navv={navv}/>
					   </Column>
					   <Column>
					       <Card w="50%" h="40%" ml="20px" mt="30px" cmt="-35px" xml={AppStyles.svg.cardUsers} title="Customers" navv={navv}/>
					   </Column>
					</ItemsLayout>
					<ItemsLayout style={{marginTop: -30}}>
					   <Column>
					       <Card w="50%" h="50%" ml="30px" mt="20px" cmt="-30px" xml={AppStyles.svg.cardWallet} title="Sales" navv={navv}/>
					   </Column>
					   <Column>
					       <Card w="50%" h="50%" ml="30px" mt="30px" cmt="-35px" xml={AppStyles.svg.cardFile} title="Reports" navv={navv}/>
					   </Column>
					</ItemsLayout>
			    </ScrollView>
			</Container>
    );
  }
  
}

const Container = styled.View`
                     flex: 1;
					 background-color: white;	
                     border-radius: 20px;					 
`;

const TitleBar = styled.View`
                     width: 100%;
					 margin-top: 40px;
					 padding-left: 80px;
					 flex-direction: row;
`;

const Avatar = styled.Image`
           width: 44px;
		   height: 44px;
		   background: black;
		   border-radius: 22px;
		   margin-left: 20px;
		   position: absolute;
		   top: 0;
		   left: 0;
`;

const Logo = styled.Image`
           width: 33px;
		   height: 33px;
		   background: black;
		   border-radius: 22px;
		   margin-left: 20px;
		   position: absolute;
		   top: 0;
		   left: 0;
`;

const Title = styled.Text`
                     margin-top: -5px;
                     font-size: 24;
					 font-weight: 500;
					 color: #b8bece;
`;

const Name = styled.Text`
                     font-size: 24;
					 font-weight: bold;
					 color: #3c4560;
					 margin-left: 10px;
					 margin-top: -5px;
`;

const Subtitle = styled.Text`
                    font-size: 20px;
					color: #3c4560;
					font-weight: 500;
					margin-top: 10px;
					margin-left: 25px;
					text-transform: uppercase;
`;

const ItemsLayout = styled.View`
                     flex-direction: row;
					 flex: 1;					 
`;

const Column = styled.View`
                   width: 50%;
				   align-items: center;
`;


const NavButton = styled.Button``;

