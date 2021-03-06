// React
import React from 'react';

// React Native
import {View, Text} from 'react-native';

// Components
import Button from '../components/Button';
import Question from '../components/Question';

// Styled Components
import styled from 'styled-components/native';

// Helpers
import {cancelLocalNotification, setLocalNotification} from '../utils';


export default class Quiz extends React.Component {
  constructor() {
    super();

    this.state = {
      currentQuestionIndex: 0,
      correctCount: 0,
      wrongCount: 0
    };

    this.onPressCorrectAnswer = this.onPressCorrectAnswer.bind(this)
    this.onPressWrongAnswer = this.onPressWrongAnswer.bind(this)
    this.onPressRetakeQuiz = this.onPressRetakeQuiz.bind(this)
    this.onPressBack = this.onPressBack.bind(this)
  }

  static navigationOptions = ({ navigation }) => {
    const {deck} = navigation.state.params;

    return {
      title: `Quiz in ${deck.title}`
    };
  }

  onPressCorrectAnswer() {
    const {currentQuestionIndex, correctCount} = this.state;
    this.setState({
      currentQuestionIndex: currentQuestionIndex + 1,
      correctCount: correctCount + 1
    })
  }

  onPressWrongAnswer() {
    const {currentQuestionIndex, wrongCount} = this.state;
    this.setState({
      currentQuestionIndex: currentQuestionIndex + 1,
      wrongCount: wrongCount + 1
    })
  }

  onPressRetakeQuiz() {
    this.setState({
      currentQuestionIndex: 0,
      correctCount: 0,
      wrongCount: 0
    });
  }

  onPressBack() {
    const {goBack} = this.props.navigation;
    goBack();
  }

  onFinishQuiz() {
    cancelLocalNotification().then(setLocalNotification());
  }

  renderResult() {
    const {correctCount, wrongCount} = this.state;
    const subtitle = `${correctCount} correct answers - ${wrongCount} wrong answers`;

    return (
      <View>
        <StyledResultTitle>Quiz Ended</StyledResultTitle>
        <StyledResultSubtitle>{subtitle}</StyledResultSubtitle>
        <Button title='Retake the Quiz' onPress={this.onPressRetakeQuiz}/>
        <Button title='Back to Deck' onPress={this.onPressBack}/>
      </View>
    );
  }

  runderButtons(question) {
    const random = Math.random() >= 0.5;

    if (random) {
      return (
        <StyledAnswersView>
          <Button title={question.correctAnswer} onPress={this.onPressCorrectAnswer}/>
          <Button title={question.wrongAnswer} onPress={this.onPressWrongAnswer}/>
        </StyledAnswersView>
      );
    } else {
      return (
        <StyledAnswersView>
          <Button title={question.wrongAnswer} onPress={this.onPressWrongAnswer}/>
          <Button title={question.correctAnswer} onPress={this.onPressCorrectAnswer}/>
        </StyledAnswersView>
      );
    }
  }

  renderQuesion(question) {
    return (
      <View>
        <Question question={question}/>
        {this.runderButtons(question)}
      </View>
    );
  }

  render() {
    const {deck} = this.props.navigation.state.params;
    const totalQuestions = deck.questions.length;
    const {currentQuestionIndex} = this.state;

    if (currentQuestionIndex >= totalQuestions) {
      this.onFinishQuiz();
      return this.renderResult();
    }

    const currentQuestion = deck.questions[currentQuestionIndex];
    const status = `Question ${currentQuestionIndex + 1} out of ${totalQuestions}`;

    return (
      <View>
        <StyledStatusText>{status}</StyledStatusText>
        {this.renderQuesion(currentQuestion)}
      </View>
    );
  }

}

// StyledStatusText
const StyledStatusText = styled.Text`
  font-size: 14;
  text-align: center;
  padding: 20px;
`

// StyledAnswersView
const StyledAnswersView = styled.View`
  margin-top: 50px;
`

// StyledResultTitle
const StyledResultTitle = styled.Text`
  font-size: 30;
  text-align: center;
  padding: 30px 0px;
  font-weight: bold;
`

// StyledResultSubtitle
const StyledResultSubtitle = styled.Text`
  font-size: 20;
  text-align: center;
  padding-bottom: 20px;
`
