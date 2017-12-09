import {
  LOAD_DECKS, ADD_DECK, DELETE_DECK
} from './types';

/**
 * Action Creators
 */
export function loadDecks(decks) {
  return {type: LOAD_DECKS, decks}
}

export function addDeck(deck) {
  return {type: ADD_DECK, deck}
}

export function deleteDeck(deck) {
  return {type: DELETE_DECK, deck}
}
