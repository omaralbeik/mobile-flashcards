/**
 * Actions
 */
export const LOAD_DECKS = 'LOAD_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';

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
