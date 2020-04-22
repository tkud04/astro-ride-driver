import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import * as helpers from '../Helpers';

// let src = (props.data.customerImg == "" || !isNaN(props.data.customerImg)) ? require("../assets/images/pic-11.jpg") : {uri: props.data.customerImg};
	           
const Customer = props => {
	            let src =  require("../assets/images/pic-11.jpg");
				return (
                            <Row>
				             <CustomerName>
				               <Logo source={{uri: "data:image/png;base64," + props.data.customerImg}}/>
					         <CustomerBio>
					           <Name>{props.data.customerName}</Name>
					           <Email>{props.data.customerEmail}</Email>
					           <Phone>Phone: {props.data.customerPhone}</Phone>
					         </CustomerBio>
                            </CustomerName>				  
				            <CustomerInfo>
				             <PriceView>
					          <Price>Debit</Price>
				        	 </PriceView>
					         <StockView>
					          <Stock>{props.data.customerType}</Stock>
					         </StockView>
				            </CustomerInfo>
				           </Row> 
					    );
};

export default Customer;


const Logo = styled.Image`
           width: 55px;
		   height: 55px;
		   background: black;
		   border-radius: 30px;
		   margin-left: 2px;
		   margin-bottom: 8px;
`;

const Row = styled.View`
   marginVertical: 20px;
   width: 100%;
   border-bottom-width: 1;
   border-bottom-color: #000;
   flex-direction: row;
`;

const CustomerName = styled.View`
   margin-left: 4px;
   margin-right: 5px;
   border-right-width: 1;
   border-right-color: #000;
   width: 70%;
   flex-direction: row;
`;
const CustomerBio = styled.View`
  
`;
const CustomerInfo = styled.View`
   width: 30%;
`;

const Name = styled.Text`
  font-size: 15;
  font-weight: 300;
  margin-left: 6px;
  margin-top: 10px;
  align-items: center;
`;

const Email = styled.Text`
  font-size: 12;
  color: blue;
  font-weight: 300;
  margin-left: 6px;
  margin-top: 10px;
  align-items: center;
`;

const Phone = styled.Text`
  font-size: 12;
  font-weight: 300;
  margin-left: 6px;
  margin-top: 10px;
  align-items: center;
`;

const PriceView = styled.View`
   width: 100%;
   border-bottom-width: 1;
   border-bottom-color: #ccc;
`;

const StockView = styled.View`
   width: 100%;
`;

const Price = styled.Text`
  font-size: 15;
  font-weight: 300;
  margin-horizontal: 5px;
  margin-vertical: 10px;
  align-items: center;
`;

const Stock = styled.Text`
  font-size: 15;
  font-weight: 300;
  margin-horizontal: 5px;
  margin-vertical: 10px;
  align-items: center;
`;

const TestButton = styled.Button`
  background-color: blue;
  color: #fff;
  border-radius: 5;
`;
