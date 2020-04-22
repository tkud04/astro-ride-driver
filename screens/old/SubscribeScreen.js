import React from 'react';
import {ScrollView, Button} from 'react-native';
import styled from 'styled-components';
import Categories from '../components/Categories';
import SubscribeCard from '../components/SubscribeCard';
import AppHomeHeader from '../components/AppHomeHeader';
import * as helpers from '../Helpers';
import AppStyles from '../styles/AppStyles';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');



export default class SubscribeScreen extends React.Component { 

 constructor(props) {
    super(props);
    this.state = { text: '', loading: false,dataSource: []};
    this.props.navigation.setParams({launchDrawer: this.launchDrawer});	
	this.navv = null;
	
	this.pkgRow1 = [
		{
		   id: 345,
	 	   name: "30 days",
		   price: "N1,500.00",
		   saved: "N0"
		},
		{
		   id: 232,
	 	   name: "90 days",
		   price: "N5,000.00",
		   saved: "N0"
		},
	];
	
	this.pkgRow2 = [
		{
		   id: 125,
	 	   name: "180 days",
		   price: "N9,500.00",
		   saved: "N500"
		},
		{
		   id: 962,
	 	   name: "360 days",
		   price: "N19,000.00",
		   saved: "N100"
		},
	];
		
	this.lifetimePkg = {
		   id: 837,
	 	   name: "One Time Purchase (Lifetime)",
		   price: "N100,000.00",
		   saved: "N0"
		};
	
  }
  
  launchDrawer = () => {
	this.navv.toggleDrawer();  
  }

static navigationOptions = ({navigation}) => {
	 
	  return {
       drawerLabel: 'Subscribe',
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight    		   
	   },
	   headerTitle: () => <AppHomeHeader xml={AppStyles.svg.chartBar} navv = {navigation} title="Tembo" subtitle="Subscribe"/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
	   }
	  }
	  
	  };


  render() {
	  let items = [];
	  let navv = this.props.navigation;
	  this.navv = navv;
		 //console.log(items);
		 
    return (
	        <Container>
			    <ScrollView>
					<ItemsLayout>
					 {
					  this.pkgRow1.map((p) => {
						  //console.log(p);					  
						  return (
						    <Column key={p.id}>
					          <SubscribeCard pkg={p} navv={navv}/>
					        </Column>  
						  )
					  })
				     }			
					</ItemsLayout>
					<ItemsLayout style={{marginTop: -30}}>
					  {
					  this.pkgRow2.map((p) => {
						  //console.log(p);					  
						  return (
						    <Column key={p.id}>
					          <SubscribeCard pkg={p} navv={navv}/>
					        </Column>  
						  )
					  })
				     }
					</ItemsLayout>
					<ItemsLayout style={{marginTop: -30,alignItems: 'center'}}>				
						    <FullColumn key={this.lifetimePkg.id}>
					          <SubscribeCard pkg={this.lifetimePkg} navv={navv}/>
					        </FullColumn>  						 
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

const FullColumn = styled.View`
                   width: 90%;
				   align-items: center;
`;


const NavButton = styled.Button``;

const MenuButton = styled.TouchableOpacity`

`;
