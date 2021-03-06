// React
import React from 'react';

// React Native
import {TextInput} from 'react-native';

// Styled Components
import styled from 'styled-components/native';


export default function TextField(props) {
  return (
    <StyledTextInput {...props}/>
  );
}

// StyledTextInput
const StyledTextInput = styled.TextInput`
  height: 50px;
  background-color: white;
  border-radius: 5px;
  text-align: center;
  font-size: 16;
  padding: 4px;
  margin: 10px;
`
