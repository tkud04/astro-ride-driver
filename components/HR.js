import React from 'react';
import styled from 'styled-components';
import AppStyles from '../styles/AppStyles';



const HR = props => {
	
return (
<Container>
<Line color={props.color}></Line>
</Container>
)
};

export default HR;

const Container = styled.View`
width: 100%;
margin-top: 5;
margin-bottom: 10;	
`;

const Line = styled.View`
width: 100%;
border-bottom-width: 1;
border-bottom-color: ${props => props.color};
`;
