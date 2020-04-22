import React from 'react';
import styled from 'styled-components';
import AppInputImageHeader from '../components/AppInputImageHeader';
import Sale from '../components/Sale';
import * as helpers from '../Helpers';
import * as wvhelpers from '../WebViews/Helper';
import AppStyles from '../styles/AppStyles';
import AssetUtils from 'expo-asset-utils';
import * as FileSystem from 'expo-file-system';
import {ScrollView, Button} from 'react-native';
import { WebView } from 'react-native-webview';
import {showMessage, hideMessage} from 'react-native-flash-message';


import { Notifications } from 'expo';

//var RNFS = require('react-native-fs');

export default class ChartsScreen extends React.Component { 
 constructor(props) {
    super(props);
	this.dt = props.navigation.state.params.dtt;
	this.props.navigation.setParams({goBack: () => {this.props.navigation.goBack()}});
	this.props.navigation.setParams({goToCharts: () => {this.goToCharts()}});
	
    this.state = { text: '',
                   dt: this.dt,
				  run: `${JSON.stringify(this.dt)}`
				 };
    this.props.navigation.setParams({launchDrawer: this.launchDrawer});	
	this.navv = null;
	//console.log(this.state);
	
		this.html = "";
		this.getHtml();
		this.webview = null;
		
  }
  
  getHtml = async () => {
	  //Webview local html
	let file = await AssetUtils.resolveAsync(require('../html/charts.html'));
	let fileContents = await FileSystem.readAsStringAsync(file.localUri);
	this.html = fileContents;
  }
  
    
  launchDrawer = () => {
	this.navv.toggleDrawer();  
  }
  
  sendData = () => {
	  //console.log("webview: ",this.webview);
	  if(this.webview !== null){
	   this.webview.postMessage(this.state.run);
	  }
  }


  static navigationOptions = ({navigation}) => {
	 
	  return {
       drawerLabel: 'Reports',
	   headerStyle: {
		   backgroundColor: AppStyles.headerBackground,
		   height: AppStyles.headerHeight    		   
	   },
	   headerTitle: () => <AppInputImageHeader xml={AppStyles.svg.chartArea} leftParam = "goBack" navv = {navigation} title="Reports" subtitle="View reports" sml={40}/>,
	   headerTintColor: AppStyles.headerColor,
	   headerTitleStyle: {
		   
	   },
	    headerLeft: null,
	  }
	 };	 

  render() {
	  let navv = this.props.navigation;
	  this.navv = navv;

    return (
	       <Container>
           <WebView 
		    useWebKit={true}
		    source={{ html: this.html }} 
			originWhitelist={['*']}
		    style={{flex: 1}}
			startInLoadingState={true}
            allowUniversalAccessFromFileURLs={true}
            javaScriptEnabled={true}
            mixedContentMode={'always'}
			onMessage={event => {
               helpers.handlePostMessageAsync(event.nativeEvent.data);
            }}
			onLoadEnd={() => {this.sendData()}}
            onNavigationStateChange={this.handleNavStateChange}
			ref={r => {this.webview = r;}}
		   />
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