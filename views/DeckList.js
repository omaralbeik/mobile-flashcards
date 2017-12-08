// React
import React from 'react';

// React Native
import {View, Text, FlatList} from 'react-native';

// Redux
import { connect } from 'react-redux';
import * as actions from '../actions';

// Components
import DeckListItem from '../components/DeckListItem';
import Button from '../components/Button';

// Navigation
import {CREATEDECK} from './Navigator';

// Styled Components
import styled from 'styled-components/native';

// Helpers
import API from '../api';
import {generateId, arrayFromObject} from '../utils';


class DeckList extends React.Component {
  constructor(props) {
    super(props);

    this.fetchDecks()
  }

  static navigationOptions = ({navigation}) => {
    return ({
      title: 'Decks',
    })
  }

  fetchDecks() {
    API.getDecks().then(decks => {
      this.props.loadDecks({type: actions.LOAD_DECKS, decks})
    })
  }

  render() {
    const {decks, navigation} = this.props;
    const decksArray = arrayFromObject(decks);

    return (
      <StyledView>
        <Button title='Create New deck' onPress={_ => navigation.navigate(CREATEDECK, {
          updater: _ => this.fetchDecks()
        })}/>
        <FlatList
          data={decksArray}
          renderItem={({item}) => <DeckListItem deck={item} navigation={navigation} updater={_ => this.fetchDecks()}/>}
          keyExtractor={(item, index) => index}
        />
      </StyledView>
    )
  }

}

// StyledView
const StyledView = styled.View`
  margin-bottom: 50px;
`

function mapStateToProps({decks}, {navigation}) {
  return {decks};
}

function mapDispatchToProps(dispatch, {navigation}) {
  return {
    loadDecks: decks => dispatch(actions.loadDecks(decks))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
