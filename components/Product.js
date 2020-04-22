import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import * as helpers from '../Helpers';

let quantityTypes = {
	                  box: " boxes",
	                  case: " cases",
	                  cm: "cm",
	                  inch: " inches",
	                  pound: "lb",
	                  foot: "ft",
	                  gram: "g",
	                  km: "km",
	                  litre: "l",
	                  meter: "m",
	                  mg: "mg",
	                  mm: "mm",
	                  ml: "ml",
	                  pack: " packs",
	                  piece: "pcs",
	                  ton: " tons",
	                  set: " sets",
	                  unit: " units",
	                  yard: " yards",
	                  other: " units (unspecified)",
					};
					

//let src = (props.data.productImg == "" || !isNaN(props.data.productImg)) ? require("../assets/images/pic-11.jpg") : {uri: props.data.productImg};

const Product = props => {	   
	            let src = require("../assets/images/pic-11.jpg");
				//console.log(src);
				return (
                            <Row>
				             <ProductName>
				               <Logo source={{uri: "data:image/png;base64," + props.data.productImg}}/>
					           <Name>{props.data.name}</Name>
                             </ProductName>				  
				             <ProductInfo>
				               <PriceView>
					            <Price>N{props.data.sellingPrice}</Price>
					           </PriceView>
					           <StockView>
					            <Stock>{`${props.data.stock}${quantityTypes[props.data.quantityType]}`}</Stock>
					           </StockView>
				             </ProductInfo>
				            </Row> 
					    );
};

export default Product;


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

const ProductName = styled.View`
   margin-left: 4px;
   margin-right: 5px;
   border-right-width: 1;
   border-right-color: #000;
   width: 60%;
   flex-direction: row;
`;
const ProductInfo = styled.View`
   width: 40%;
`;

const Name = styled.Text`
  font-size: 15;
  font-weight: 300;
  margin-left: 6px;
  font-family: ${AppStyles.fontFamily};
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
  font-family: ${AppStyles.fontFamily};
  margin-horizontal: 5px;
  margin-vertical: 10px;
  align-items: center;
`;

const Stock = styled.Text`
  font-size: 15;
  font-weight: 300;
  font-family: ${AppStyles.fontFamily};
  margin-horizontal: 5px;
  margin-vertical: 10px;
  align-items: center;
`;

const TestButton = styled.Button`
  background-color: ${AppStyles.mainButtonBackground};
  color: #fff;
  border-radius: 5;
`;
