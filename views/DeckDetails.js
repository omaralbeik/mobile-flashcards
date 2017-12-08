// React
import React from 'react';

// React Native
import {ScrollView, Text} from 'react-native';

// Components
import Button from '../components/Button';

// Styled Components
import styled from 'styled-components/native';


class DeckDetails extends React.Component {

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
    console.log('Did press delete deck');
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


export default DeckDetails;
