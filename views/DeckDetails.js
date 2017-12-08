// React
import React from 'react';

// React Native
import {ScrollView, Text} from 'react-native';

// Redux
import { connect } from 'react-redux';
import * as actions from '../actions';

// Navigation
import {CREATEQUESTION} from '../views/Navigator';

// Components
import Button from '../components/Button';

// Styled Components
import styled from 'styled-components/native';

// API
import API from '../api';

class DeckDetails extends React.Component {

  constructor(props) {
    super(props);

    this.handleAddQuestion = this.handleAddQuestion.bind(this)
    this.handleStartQuiz = this.handleStartQuiz.bind(this)
    this.handleDeleteDeck = this.handleDeleteDeck.bind(this)
  }

  static navigationOptions = ({ navigation }) => {
    const {deck} = navigation.state.params;
    return {
      title: deck.title,
    }
  }

  handleAddQuestion() {
    console.log('Did press create question');
    const {deck} = this.props.navigation.state.params;
    const {navigate, updater} = this.props;
    navigate(CREATEQUESTION, {deck: deck, updater: updater});
  }

  handleStartQuiz() {
    console.log('Did press start quiz');
  }

  handleDeleteDeck() {
    const {deck} = this.props.navigation.state.params;
    API.deleteDeck(deck).then(_ => {
      this.props.deleteDeck({type: actions.DELETE_DECK, deck});
      this.goBack();
    })
  }

  goBack() {
    const {goBack, updater} = this.props;
    updater()
    goBack()
  }

  renderStartQuizButton() {
    const {deck} = this.props.navigation.state.params;

    if (deck.questions.length === 0) {
      return null;
    }
    return (
      <Button title='Start Quiz' onPress={this.handleStartQuiz}/>
    );
  }

  render() {
    const {deck} = this.props.navigation.state.params;
    const count = deck.questions.length
    const countText = count === 0 ? 'No Questions' : `${count} Questions`;

    return (
      <ScrollView>
        <StyledTitleText>{deck.title}</StyledTitleText>
        <StyledSubtitleText>{countText}</StyledSubtitleText>
        <Button title='Add Question' onPress={this.handleAddQuestion}/>
        {this.renderStartQuizButton()}
        <Button title='Delete Deck' onPress={this.handleDeleteDeck} destructive={true}/>
      </ScrollView>
    )
  }

}

// StyledTitleText
const StyledTitleText = styled.Text`
  font-size: 20;
  font-weight: bold;
  padding: 20px 20px 10px 20px;
  text-align: center;
`

const StyledSubtitleText = styled.Text`
  font-size: 15;
  padding-bottom: 20px;
  text-align: center;
`

function mapStateToProps({decks}, {navigation}) {
  return {decks};
}

function mapDispatchToProps(dispatch, {navigation}) {
  return {
    deleteDeck: deck => dispatch(actions.deleteDeck(deck)),
    goBack: navigation.goBack,
    updater: navigation.state.params.updater,
    navigate: navigation.navigate
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails);
