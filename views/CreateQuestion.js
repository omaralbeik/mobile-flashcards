// React
import React from 'react';

// React Native
import {KeyboardAvoidingView, Text, Alert} from 'react-native';

// Redux
import { connect } from 'react-redux';
import * as actions from '../actions';

// Navigation
import {DECKDETAILS} from '../views/Navigator';

// Components
import TextField from '../components/TextField';
import Button from '../components/Button';

// API
import API from '../api';


class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionName: '',
      correctAnswer: '',
      wrongAnswer: ''
    };

    this.onPressAdd = this.onPressAdd.bind(this);
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Add Question'
  });

  onPressAdd() {
    const {deck} = this.props.navigation.state.params;
    const {questionName, correctAnswer, wrongAnswer} = this.state;

    API.addQuestionToDeck(deck, questionName, correctAnswer, wrongAnswer).then(deck => {
      this.props.addDeck({type: actions.ADD_DECK, deck});
      this.goBack();
    });
  }

  goBack() {
    const {goBack, updater} = this.props;
    updater()
    goBack()
  }

  render() {
    const {questionName, correctAnswer, wrongAnswer} = this.state;
    var disabled = false;

    if (questionName.trim().length === 0) {
      disabled = true;
    }

    if (correctAnswer.trim().length === 0) {
      disabled = true;
    }

    if (wrongAnswer.trim().length === 0) {
      disabled = true;
    }

    return (
      <KeyboardAvoidingView>
        <TextField
          placeholder='Question'
          value={questionName}
          onChangeText={text => this.setState({questionName: text})}
        />
        <TextField
          placeholder='Correct Answer'
          value={correctAnswer}
          onChangeText={text => this.setState({correctAnswer: text})}
        />
        <TextField
          placeholder='Wrong Answer'
          value={wrongAnswer}
          onChangeText={text => this.setState({wrongAnswer: text})}
        />
        <Button title='Add Question' onPress={this.onPressAdd} disabled={disabled}/>
      </KeyboardAvoidingView>
    );
  }
}


function mapStateToProps({decks}, {navigation}) {
  return {decks};
}

function mapDispatchToProps(dispatch, {navigation}) {
  return {
    addDeck: deck => dispatch(actions.addDeck(deck)),
    goBack: navigation.goBack,
    updater: navigation.state.params.updater,
    navigate: navigation.navigate
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuestion);
