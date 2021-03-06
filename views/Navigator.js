// Navigation
import {StackNavigator} from 'react-navigation';

// Views
import DeckList from './DeckList';
import CreateDeck from './CreateDeck';
import DeckDetails from './DeckDetails';
import CreateQuestion from './CreateQuestion';
import Quiz from './Quiz';

// View Names
export const DECKLIST = 'DeckList';
export const CREATEDECK = 'CreateDeck';
export const DECKDETAILS = 'DeckDetails';
export const CREATEQUESTION = 'CreateQuestion';
export const QUIZ = 'Quiz';


export default Navigator = StackNavigator({
  [DECKLIST]: {
    screen: DeckList
  },
  [CREATEDECK]: {
    screen: CreateDeck
  },
  [DECKDETAILS]: {
    screen: DeckDetails
  },
  [CREATEQUESTION]: {
    screen: CreateQuestion
  },
  [QUIZ]: {
    screen: Quiz
  }
})
