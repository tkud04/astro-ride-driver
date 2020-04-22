import React from 'react';
import styled from 'styled-components';

let naira = '\u8358';
const HomeCard = props => (
<Container>
   <Cover>
      <Image source={require('../assets/images/product-1.jpg')}/>
   </Cover>
</Container>
);

export default HomeCard;

const Container = styled.View`
                  background: #fff;
				   flex: 1;				
`;

const Cover = styled.View`
              width: 100%;
			  height: 100%;
`;

const Image = styled.Image`
              width: 100%;
			  height: 100%;
`;