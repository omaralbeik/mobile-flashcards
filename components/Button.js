// React
import React from 'react';
import PropTypes from 'prop-types';

// React Native
import {Text, TouchableOpacity} from 'react-native';

// Styled Components
import styled from 'styled-components/native';


export default class Button extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    disabled: PropTypes.bool,
    destructive: PropTypes.bool
  }

  constructor(props) {
    super(props);

  }

  render() {
    const {title, onPress, disabled, destructive} = this.props;

    return (
      <StyledTouchableOpacity onPress={onPress} disabled={disabled} destructive={destructive}>
        <StyledText>{title}</StyledText>
      </StyledTouchableOpacity>
    );
  }
}

// StyledTouchableOpacity
const StyledTouchableOpacity = styled.TouchableOpacity`
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
