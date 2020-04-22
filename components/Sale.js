import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import * as helpers from '../Helpers';

/**
[{"customers":[{"customerImg":"","customerName":"Rita Okere","customerType":"individual","customerEmail":"ritaoker3@gmail.com","customerPhone":"08094625805","sa":"50 trans amadi layout, Port Harcourt Rivers state","notes":"","gender":"female","id":"customer_518738"}],"products":[{"name":"Green Tea","quantityType":"piece","sku":"SKU347178","costPrice":"500","sellingPrice":"1000","stock":"150","notes":"","productImg":"../assets/images/pic-11.jpg","categories":""}],"taxType":"flat","discountType":"flat","shipping":0,"tax":0,"discount":0}]
**/


const Sale = props => {
	            let src = (props.data.customerImg == "" || !isNaN(props.data.customerImg)) ? require("../assets/images/pic-11.jpg") : {uri: props.data.customerImg};
				let customers = props.data.customers, products = props.data.products;
				let itemText = products.length == 1 ? 'item' : 'items';
				return (
                            <Row>
				             <CustomerName>
				               <Logo source={src}/>
					         <CustomerBio>
					          
					           <Name>{customers[0].customerName}</Name>
					           <Email>{props.data.date}</Email>
					           <Phone>Added by: Me</Phone>
					         </CustomerBio>
                            </CustomerName>				  
				            <CustomerInfo>
				             <StatusView>
					          <StatusWrapper bc="green">
					            <Status color="white">Paid</Status>
				        	  </StatusWrapper>
				        	 </StatusView>
					         <StockView>
					          <Stock> {`${products.length} ${itemText}`}</Stock>
					         </StockView>
				            </CustomerInfo>
				           </Row> 
					    );
};

export default Sale;


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
   border-bottom-color: green;
   flex-direction: row;
`;

const CustomerName = styled.View`
   margin-left: 4px;
   margin-right: 5px;
   border-right-width: 1;
   border-right-color: green;
   width: 70%;
   flex-direction: row;
`;
const CustomerBio = styled.View`
  
`;
const CustomerInfo = styled.View`
   width: 30%;
`;

const ItemCount = styled.Text`
  font-size: 15;
  font-weight: 300;
  margin-left: 6px;
  margin-top: 10px;
  align-items: center;
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

const StatusView = styled.View`
   width: 100%;
   border-bottom-width: 1;
   border-bottom-color: #ccc;
`;

const StatusWrapper = styled.View`
   width: 80%;
   height: 40;
   padding: 5px;
   background-color: ${props => props.bc};
     align-items: center;
	 justify-content: center;
`;

const StockView = styled.View`
   width: 100%;
`;

const Status = styled.Text`
  font-size: 15;
  font-weight: 300;
  margin-horizontal: 5px;
  margin-vertical: 10px;
  color: ${props => props.color};
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
