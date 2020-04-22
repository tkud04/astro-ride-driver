import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';
import SvgIcon from './SvgIcon';
import * as helpers from '../Helpers';


const AppInputHeader = props => (
<HeaderView>
  <SvgView>
     <SvgIcon xml={helpers.insertAppStyle(props.xml)} w={props.w} h={props.h}/>
  </SvgView>
  <TitleView>
  <Title>{props.title}</Title>
  </TitleView>
</HeaderView>  
);

export default AppInputHeader;


const Title = styled.Text`
 font-size: 24;
 font-family: ${AppStyles.fontFamily};
 margin-top: 5px;
 margin-left: 10px;
 margin-bottom: 30px;
 color: ${AppStyles.headerColor};
`;

const HeaderView = styled.View`
flex-direction: column;
margin-left: 45px;
`;

const SvgView = styled.View`
 margin-left: 20px;
 margin-top: 60px;
 width: 100%;
`;

const TitleView = styled.View`
margin-bottom: 10px;
`;