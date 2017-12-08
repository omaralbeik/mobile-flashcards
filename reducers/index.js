import {LOAD_DECKS, ADD_DECK} from '../actions';


export default function decks(state = {}, action) {
  const {decks, deck} = action;

  switch (action.type) {

    // load decks to store
    case LOAD_DECKS:
      return {
        ...state,
        ...decks
      }

    // add a deck
    case ADD_DECK:
      return {
        ...state,
        [deck.id]: deck
      }

    // any other action: return all decks
    default:
      return state;
  }
}
