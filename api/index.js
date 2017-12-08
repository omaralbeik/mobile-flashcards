// React Native
import {AsyncStorage} from 'react-native';


export default class API {

  static get DECKS_STORAGE_KEY() {
    return 'FlashCards:decks';
  }

  static createDeck(id, title, questions = []) {
    const data = JSON.stringify({
      [id]: {
        key: id,
        title: title,
        questions: questions
      }
    })
    return AsyncStorage.mergeItem(this.DECKS_STORAGE_KEY, data).then(_ => {
      return this.getDeck(id);
    });
  }

  static addQuestionToDeck(deck, questionTitle, correctAnswer, wrongAnswer) {
    const {id, title} = deck;
    var {questions} = deck;
    const question = {
      title: questionTitle,
      correctAnswer: correctAnswer,
      wrongAnswer: wrongAnswer
    }
    questions.push(question);
    return this.createDeck(id, title, questions);
  }

  static getDeck(id) {
    return this.getDecks().then(decks => {
      return Object.keys(decks).length === 0
        ? {}
        : decks[id];
    })
  }

  static getDecks() {
    return AsyncStorage.getItem(this.DECKS_STORAGE_KEY).then(data => {
      return data === null
        ? {}
        : JSON.parse(data);
    });
  }

  static clear() {
    return AsyncStorage.clear();
  }

}
