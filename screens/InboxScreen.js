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
  
 
  
 
const InboxScreen = (props) =>  { 
   
	navv = props.navigation;

	const [isLoading, setIsLoading] = useState(true);
	const [fadeAnim] = useState(new Animated.Value(0));
	const [messages, setMessages] = useState([]);
 
 const _viewMessage = (i) => {
	 console.log("i: ",i);
	 
	  navv.navigate('ReadMessage',{
		  i: i
		  });
 }
 
 const _getInbox = async () => {
   
    helpers.getLoggedInUser().then((dt) => {
			  	setMessages([
				{key: "1", title: "Welcome to Astro Ride!", msg: "We are glad to have you as part of us. We wish you a wonderful experience filled with good memories and big profits!"},
				{key: "2", title: "Become a verified driver", msg: "A Verified badge ensures you get more rides and more profits. Verify your personal and vehicle details to proceed."},
				]);	
				
                setIsLoading(false);				
		 });
  }
  

 
	
    useEffect(() => {
		 props.navigation.setParams({launchDrawer: _launchDrawer});
		 
		 _getInbox();
   },[]);
   
   useEffect(() => {
	if(isLoading){
	Animated.loop(
	Animated.sequence([
	Animated.timing(fadeAnim,{
		toValue: 1,
		duration: 1000
	}),
	Animated.timing(fadeAnim,{
		toValue: 0,
		duration: 1000
	})
	])
	).start();
    }
   },[isLoading]);
  
	
    return (
	 <UserContext.Consumer> 
   {({user,up,loggedIn}) => (
	        <Container>				
					<Row style={{ alignItems: 'center', justifyContent: 'center', marginTop: 10, width: '100%',backgroundColor: 'rgba(0,0,0,0)'}}>
						{isLoading ? (
						<Animated.View
						  style={{opacity: fadeAnim}}
						 >
						<TitleHeader bc="rgb(101, 33, 33)" tc="rgb(101, 33, 33)" title="Processing.."/>
						</Animated.View>
					   
						) : (
						 <TitleHeader bc="rgb(101, 33, 33)" tc="rgb(101, 33, 33)" title="Inbox"/>
						)}
					</Row>
					<Row style={{ marginTop: 5, marginBottom: 10, width: '100%',backgroundColor: 'rgba(0,0,0,0)'}}>
                      <FlatList
					    data={messages}
						renderItem={({item}) => {
							console.log("item: ",item);
							if(item){
							return(
						  <SubmitButton
						    onPress={() => {_viewMessage(item)}}
						  >
						  <Message>
						    <MessageLogo>
							  <AstroIcon xml={AppStyles.svg.ionRocket} w={20} h={20} ss={{paddingLeft: 2, paddingVertical: 5, borderRadius: 10}}/>
							</MessageLogo>
							<MessageBodyWrapper>
						      <Title>{item.title}</Title>
							  
							</MessageBodyWrapper>
						  </Message>
						  </SubmitButton>
						  );
							}
						}}
					  />
					</Row>
										
				 
			</Container>
		 )}
   </UserContext.Consumer>
    );  

}

export default InboxScreen;
  
  
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

const Message = styled.View`
margin-vertical: 20;
border-bottom-width: 1px;
border-bottom-color: #cdcdcd;
flex-direction: row;
`;

const MessageLogo = styled.View`
margin-right: 10;
background-color: #000;
border-radius: 15;
width: 30;
height: 30;
padding: 2px;
text-align: center;
justify-content: center;
`;

const MessageBodyWrapper = styled.View`
`;

const MsgBodyWrapper = styled.View`
`;

const Title = styled.Text`
font-size: 19px;
font-weight: bold;
`;

const MessageBody = styled.Text`
font-size: 14px:
`;

const SubmitButton = styled.TouchableOpacity`

`;