import React,{useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import CButton from '../components/CButton';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import SvgIcon from '../components/SvgIcon';
import LoadingView from '../components/LoadingView';
import TitleHeader from '../components/TitleHeader';
import AstroIcon from '../components/AstroIcon';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import {ScrollView, Dimensions, ActivityIndicator, Animated,FlatList} from 'react-native';
import {ThemeContext,UserContext} from '../MyContexts';
import {showMessage, hideMessage} from 'react-native-flash-message';
import HR from '../components/HR';

import { Notifications } from 'expo';

const { width, height } = Dimensions.get('window');

let dt = {}, navv = null;

  
  const _launchDrawer = () => {
	navv.toggleDrawer();  
  }
  
 
  
 
const MessageScreen = (props) =>  { 
   
	navv = props.navigation;
    let i = props.route.params.i;
	
	const [isLoading, setIsLoading] = useState(true);
	const [fadeAnim] = useState(new Animated.Value(0));
	const [messages, setMessages] = useState([]);


 
	
    useEffect(() => {
		 props.navigation.setParams({launchDrawer: _launchDrawer});
   },[]);
 
  
	
    return (
	 <UserContext.Consumer> 
   {({user,up,loggedIn}) => (
	        <Container>				
					<Row style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10, width: '100%',backgroundColor: 'rgba(0,0,0,0)'}}>				
						 <TitleHeader bc="rgb(101, 33, 33)" tc="rgb(101, 33, 33)" title={i.title}/>
					</Row>
					<Row style={{ marginTop: 5, marginBottom: 10, width: '100%',backgroundColor: 'rgba(0,0,0,0)'}}>
                      <Message>{i.msg}</Message>
					</Row>
										
				 
			</Container>
		 )}
   </UserContext.Consumer>
    );  

}

export default MessageScreen;
  
  
 const Container = styled.View`
					 background-color: #fff;
					flex: 1;
					justify-content: flex-start;
`;

const Row = styled.View`
   margin: 5px;
   width: 100%;
   flex-direction: row;
`;

const Message = styled.Text`
font-size: 17px;
font-weight: bold;
`;

const SubmitButton = styled.TouchableOpacity`

`;