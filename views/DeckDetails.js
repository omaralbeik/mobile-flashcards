// React
import React from 'react';

// React Native
import {ScrollView, Text} from 'react-native';

// Redux
import { connect } from 'react-redux';
import * as actions from '../actions';

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
    const {goBack, updater, navigate} = this.props;
    updater()
    goBack()
  }

  render() {
    const {deck} = this.props.navigation.state.params;

    return (
      <ScrollView>
        <StyledTitleText>{deck.title}</StyledTitleText>
        <Button title='Add Question' onPress={this.handleAddQuestion}/>
        <Button title='Start Quiz' onPress={this.handleStartQuiz} disabled={deck.questions.length === 0}/>
        <Button title='Delete Deck' onPress={this.handleDeleteDeck} destructive={true}/>
      </ScrollView>
    )
  }

}

// StyledTitleText
const StyledTitleText = styled.Text`
  font-size: 20;
  font-weight: bold;
  padding: 20px;
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
