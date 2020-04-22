import React from 'react';
import styled from 'styled-components';
import AppInputImageHeader from '../components/AppInputImageHeader';
import ReportsCard from '../components/ReportsCard';
import TitleHeader from '../components/TitleHeader';
import * as helpers from '../Helpers';
import AppStyles from '../styles/AppStyles';
import {ScrollView, Button} from 'react-native';
import { WebView } from 'react-native-webview';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class ReportsScreen extends React.Component { 
   constructor(props) {
    super(props);
	this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
    this.state = { text: '', loading: false,sales: []};	
    this.navv = null;
    
	this.dt = {
		title: "Business Report",
		type: "doughnut",
		dp: `
				{ label: "apple",  y: 10  },
				{ label: "orange", y: 15  },
				{ label: "banana", y: 25  },
				{ label: "mango",  y: 30  },
				{ label: "grape",  y: 28  }	
		`
	};

  }

  goToCharts = () => {
	showMessage({
			 message: `Takes you the the Charts screen.. coming soon`,
			 type: 'info'
		 });
	
	this.navv.navigate('Charts',{
		dt: this.dt,
	});  
  }

  static navigationOptions = ({navigation}) => {
	   return {
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight
	   },
	   headerTitle: () => <AppInputImageHeader xml={AppStyles.svg.headerClipboard}  leftParam = "goBack" navv = {navigation} title="Reports" subtitle="View business/stock reports" sml={40}/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
       },
	   headerLeft: null,
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
				  <Row>	
				   <TitleHeader bc="green" tc="green" title="Total sales and total profit at a quick glance!"/>
				  </Row>
					<ItemsLayout>
						    <Column key={365}>
					          <ReportsCard rt="business" title="Business reports" navv={navv}/>					          
					        </Column>  	
							<Column key={2020}>
					          <ReportsCard rt="stock" title="Stock reports" navv={navv}/>				          
					        </Column>  		
							
					</ItemsLayout>
			    </ScrollView>
			</Container>
    );
  }
  
      handleNavStateChange = newNavState => {
	 const { url } = newNavState;
	 	 if (!url) return;
	// console.log("url: " + url);
	 if(url.includes("admin/assignment")){
		 this.webview.stopLoading();
		 console.log("url: " + url);
	 }

  };
}


const Container = styled.View`
                     flex: 1;
					 background-color: white;	
                     border-radius: 20px;					 
`;
const MenuButton = styled.TouchableOpacity`

`;

const ItemsLayout = styled.View`
                     flex-direction: row;
					 flex: 1;
                     margin-top: 30;					 
`;

const Column = styled.View`
                   width: 50%;
				   align-items: center;
`;

const Row = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 20px;	
`;