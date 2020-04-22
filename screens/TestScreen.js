import React,{useState, useEffect, useCallback, useRef} from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import * as helpers from '../Helpers';
import {ScrollView, Dimensions, ActivityIndicator, Animated} from 'react-native';
import {ThemeContext,UserContext} from '../MyContexts';
import {showMessage, hideMessage} from 'react-native-flash-message';
import Svg, { Circle, Rect, Text } from 'react-native-svg';

import { Notifications } from 'expo';

const { width, height } = Dimensions.get('window');
 
  
  const _launchDrawer = () => {
	navv.toggleDrawer();  
  }
  

const TestScreen = (props) =>  { 
   
	u = props.route.params.u;
	navv = props.navigation;
	
	
	const [fadeAnim] = useState(new Animated.Value(0));
	const [isVisible,setIsVisible] = useState(false);
	
	
    useEffect(() => {
		console.log(isVisible);
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
    
   },[isVisible]);
   
	
    return (
	 <UserContext.Consumer> 
   {({user,up,loggedIn}) => (
	        <Container>	     
					 <Row style={{flex: 1, marginTop: 10, marginLeft: 50,  alignContent: 'center', justifyContent: 'center', width: '100%'}}>
					   <Animated.View
                        style={{ width: 250, height: 250, opacity: fadeAnim}}
                       >
					    <Svg height="100%" width="100%" viewBox="0 0 100 100">
                          <Circle cx="50" cy="50" r="35" stroke="#fff" strokeWidth="2.5" fill="rgb(101, 33, 33)"/>						  
                         </Svg>
                        
                       </Animated.View>
					   <LoadingTextView>
					    <LoadingText>Finding nearby drivers</LoadingText>
					   </LoadingTextView>
					 </Row>
			</Container>
		 )}
   </UserContext.Consumer>
    );  

}

export default TestScreen;
  
  
  const BackgroundImage = styled.ImageBackground`
           width: 100%;
		   height: 100%;
`;

const Container = styled.View`
					 background-color: #fff;
					flex: 1;
					justify-content: flex-end;
`;


const Row = styled.View`
   margin: 5px;
   width: 100%;
`;

const LoadingTextView = styled.View`
justify-content: center;
`;

const LoadingText = styled.Text`
   font-size: 20px;
   margin: 10px;
   color: rgb(101, 33, 33);
`;

