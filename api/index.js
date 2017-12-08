// React Native
import {AsyncStorage} from 'react-native';


export default class API {

  static get DECKS_STORAGE_KEY() {
    return 'FlashCards:decks';
  }

  static createDeck(key, title, questions = []) {
    const data = JSON.stringify({
      [key]: {
        key: key,
        title: title,
        questions: questions
      }
    })
    return AsyncStorage.mergeItem(this.DECKS_STORAGE_KEY, data).then(_ => {
      return this.getDeck(key);
    });
  }

  static addQuestionToDeck(deck, questionTitle, correctAnswer, wrongAnswer) {
    const {key, title} = deck;
    var {
      questions
    } = deck;
    const question = {
      title: questionTitle,
      correctAnswer: correctAnswer,
      wrongAnswer: wrongAnswer
    }
    questions.push(question);
    return this.createDeck(key, title, questions);
  }

  static getDeck(key) {
    return this.getDecks().then(decks => {
      return Object.keys(decks).length === 0
        ? {}
        : decks[key];
    })
  }

  static getDecks() {
    return AsyncStorage.getItem(this.DECKS_STORAGE_KEY).then(data => {
      return data === null
        ? {}
        : JSON.parse(data);
    });
  }

  static deleteDeck(deck) {
    return this.getDecks().then(decks => {
      decks[deck.key] = undefined
      delete decks[deck.key]
      return AsyncStorage.setItem(this.DECKS_STORAGE_KEY, JSON.stringify(decks))
    })
  }

  static clear() {
    return AsyncStorage.clear();
  }

}
