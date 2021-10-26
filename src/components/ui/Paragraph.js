import React from 'react';
import styled from 'styled-components/native';

const Component = styled.Text`
  font-size: 20px;
`;

function Paragraph({children}) {
  return <Component>{children}</Component>;
}

export default Paragraph;
