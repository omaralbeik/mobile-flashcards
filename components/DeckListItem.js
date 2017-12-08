// React
import React from 'react';
import PropTypes from 'prop-types';

// React Native
import {Text, TouchableOpacity} from 'react-native';

// Navigation
import {DECKDETAILS} from '../views/Navigator';

// Styled Components
import styled from 'styled-components/native';


export default class DeckListItem extends React.Component {
  static propTypes = {
    deck: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this)
  }

  onPress() {
    const {deck, navigation} = this.props;
    navigation.navigate(DECKDETAILS, {deck: deck});
  }

  render() {
    const {deck} = this.props;
    const count = deck.questions.length

    const countText = count === 0 ? 'No Questions' : `${count} Questions`;

    return (
      <StyledTouchableOpacity onPress={this.onPress}>
        <StyledTitle>{deck.title}</StyledTitle>
        <StyledQuestion>{countText}</StyledQuestion>
      </StyledTouchableOpacity>
  );
  }
}

const StyledTouchableOpacity = styled.TouchableOpacity`
  background-color: white;
  padding: 20px;
  margin-bottom: 2px;
`

const StyledTitle = styled.Text`
  font-size: 20;
  font-weight: bold;
`

const StyledQuestion = styled.Text`
  margin-top: 5px;
  font-size: 15;
`
