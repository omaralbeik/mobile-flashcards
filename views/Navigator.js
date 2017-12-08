// Navigation
import {StackNavigator} from 'react-navigation';

// Views
import DeckList from './DeckList';
import CreateDeck from './CreateDeck';
import DeckDetails from './DeckDetails';

// View Names
export const DECKLIST = 'DeckList';
export const CREATEDECK = 'CreateDeck';
export const DECKDETAILS = 'DeckDetails';


export default Navigator = StackNavigator({
  [DECKLIST]: {
    screen: DeckList
  },
  [CREATEDECK]: {
    screen: CreateDeck
  },
  [DECKDETAILS]: {
    screen: DeckDetails
  }
})
