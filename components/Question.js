// React
import React from 'react';
import PropTypes from 'prop-types';

// React Native
import {View, Text, TouchableOpacity} from 'react-native';

// Styled Components
import styled from 'styled-components/native';


export default class Question extends React.Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
  }

  constructor() {
    super();

    this.state = {isAnswerVisible: false};
    this.onPressButton = this.onPressButton.bind(this)
  }

  onPressButton() {
    const {isAnswerVisible} = this.state;
    this.setState({isAnswerVisible: !isAnswerVisible})
  }

  renderButton() {
    const {isAnswerVisible} = this.state;
    const title = isAnswerVisible ? 'Back to Question' : 'Reveal Answer';

    return (
      <StyledTouchableOpacity onPress={this.onPressButton}>
        <StyledTouchableOpacityText>{title}</StyledTouchableOpacityText>
      </StyledTouchableOpacity>
    );
  }

  render() {
    const {title, correctAnswer, wrongAnswer} = this.props.question;
    const {isAnswerVisible} = this.state;

    return (
      <View>
        <StyledTitleText>{isAnswerVisible ? correctAnswer : title}</StyledTitleText>
        {this.renderButton()}
      </View>
    );
  }
}

// StyledTitleText
const StyledTitleText = styled.Text`
  text-align: center;
  font-size: 25;
  font-weight: bold;
  padding: 20px;
`

// StyledTouchableOpacity
const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 50%;
  align-self: center;
  border-radius: 5px;
  background-color: blue;
  padding: 5px;
`

// StyledTouchableOpacityText
const StyledTouchableOpacityText = styled.Text`
  font-size: 18;
  text-align: center;
  color: white;
  padding: 5px 10px;
`
