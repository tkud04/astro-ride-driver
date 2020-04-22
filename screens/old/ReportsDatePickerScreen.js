import React from 'react';
import styled from 'styled-components';
import AppInputImageHeader from '../components/AppInputImageHeader';
import TitleHeader from '../components/TitleHeader';
import * as helpers from '../Helpers';
import AppStyles from '../styles/AppStyles';
import {SafeAreaView, Button} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class ReportsDatePickerScreen extends React.Component { 
   constructor(props) {
    super(props);
	this.reportsType = props.navigation.state.params.reportsType;
	this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
    this.state = { text: '', loading: false,sales: []};	
    this.navv = null;
    
	this.dt = [{key: '1',title:"Today",value:"today"},
	           {key: '2',title:"Yesterday",value:"yesterday"},
	           {key: '3',title:"Last 7 days",value:"7-days"},
	           {key: '4',title:"Last 30 days",value:"30-days"},
	           {key: '5',title:"Previous month",value:"prev-month"},
	           {key: '6',title:"Current month",value:"current-month"},
	           {key: '7',title:"All",value:"all"},
	];
	
	//console.log("reports type: ",this.reportsType);
  }

  pickDate = (dt) => {
	/**
	showMessage({
			 message: `Takes you the the Charts screen.. coming soon`,
			 type: 'info'
		 });
	**/
	
	let today = helpers.getDate();
    //console.log("rt from pick date: ",this.reportsType);
	switch(this.reportsType){
	case "business":
	helpers.getSales((sales) => {
		//console.log("sales: ",sales);
		let result = sales;
		
		if(dt.value !== "all"){
		   let d2 = helpers.getDateInterval(dt.value);
		   result = sales.filter(s => helpers.compareDates(s.date,d2,dt.value));
		}
		let dtt = {dt: result,type: this.reportsType};
		//console.log("result: ",result);
		this.navv.navigate('Tables',{
		   dt: dtt
	    });
	});
	break;
	
	case "stock":
	helpers.getProducts((products) => {

		let result = products;
		
		let dtt = {dt: result,type: this.reportsType};
		//console.log("result: ",dtt);
		this.navv.navigate('Tables',{
		   dt: dtt
	    });
	});
	break;
	
    }

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
	
	DateType = (dt) => {
	  //console.log("dt: ",dt);
	  return(
	  <DateView style={{width: '100%', padding: 5,borderBottomWidth: 1, borderColor: '#ccc',}}>
	  <DateButton
	  onPress={() =>{
			this.pickDate(dt); 
		}}
	  >
	  
	    <DateText style={{ padding: 10}}>{dt.title}</DateText>
	  
	  </DateButton>
	  </DateView>
	);
	}

 render() {
	  let items = [];
	  let navv = this.props.navigation;
	  this.navv = navv;
		 //console.log(items);
		 
    return (
	        <Container>
				  <Row>	
				  <SafeAreaView style={{width: '100%'}}>
				   <DateTypes
				   data={this.dt} 
				   renderItem={(item) => this.DateType(item.item)}
				   keyExtractor={item => item.key}
				   />
				   </SafeAreaView>
				  </Row>			    
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
                     border-radius: 20px;
                     width: 100%;					 
`;
const DateButton = styled.TouchableOpacity`

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
   width: 100%;
    margin-top: 20px;	
`;

const DateTypes = styled.FlatList`
   width: 100%;
`;

const DateView = styled.View`

`;

const DateText = styled.Text`
font-size: 20;
color: green;
`;