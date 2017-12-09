// React
import React from 'react';
import PropTypes from 'prop-types';

// React Native
import {Text, TouchableOpacity} from 'react-native';

// Styled Components
import styled from 'styled-components/native';


export default function Button(props) {
  const {title, onPress, disabled, destructive} = props;

  return (
    <StyledTouchableOpacity onPress={onPress} disabled={disabled} destructive={destructive}>
      <StyledText>{title}</StyledText>
    </StyledTouchableOpacity>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  destructive: PropTypes.bool
}

// StyledTouchableOpacity
const StyledTouchableOpacity = styled.TouchableOpacity`
  margin-bottom: 2px;
  margin-top: ${props => props.destructive ? '20px' : '0px'};
  padding: 10px;
  background-color: ${props => props.disabled ? 'lightgray' : props.destructive ? 'red' : 'blue'};
  height: 50px;
`

// StyledText
const StyledText = styled.Text`
  text-align: center;
  color: white;
  font-size: 18;
  font-weight: bold;
  padding: 5px;
`
