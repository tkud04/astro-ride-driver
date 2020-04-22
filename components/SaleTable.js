import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import * as helpers from '../Helpers';
import TableRows from './TableRows';


let hc = 0, rc = 0;
let headerCount = 0;
 
const SaleTable = props => {
	console.log(props.data);
	headerCount = props.data.headers.length;
	let total = 1200;
	           return (
			               <TableView>
                            <TableHeader>
							{
					          props.data.headers.map((h) => {
						       //console.log(p);
                               ++hc;							   
						      return  <HeaderItem key={"header_" + hc}>{h}</HeaderItem>
					          })
				            }
							</TableHeader>
							<TableRowsView>
							{
							 props.data.rows.map((r) => {
						      // console.log(r);
							  let st = (parseInt(r[2]) * parseInt(r[3]));
							   ++rc;
						      return <TableRows key={"row_" + rc} data={[r[1],r[2],r[3]]} st={st}/>
					          })
							}
				           </TableRowsView> 
						   <TableFooter>
						     <FooterItem key={"footer_0"}></FooterItem>
						     <FooterItem key={"footer_1"}></FooterItem>
						     <FooterItem key={"footer_00"}>Total:</FooterItem>
						     <FooterItem key={"footer_11"}>N{props.data.total}</FooterItem>
						   </TableFooter>
				           </TableView> 
					    );
};

export default SaleTable;



const TableView = styled.View`

`;

const TableRowsView = styled.View`

`;

const TableHeader = styled.View`
   marginVertical: 20px;
   width: 100%;
   background-color: green;
   flex-direction: row;
   justify-content: space-between;
`;

const TableFooter = styled.View`
   marginVertical: 20px;
   width: 100%;
   background-color: green;
   flex-direction: row;
   justify-content: space-between;
`;



const HeaderItem = styled.Text`
  font-size: 16;
  font-weight: 300;
  margin: 6px;
  color: #fff;
`;

const FooterItem = styled.Text`
  font-size: 16;
  font-weight: 300;
  margin: 6px;
  color: #fff;
`;

