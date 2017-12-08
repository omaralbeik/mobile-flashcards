// React
import React from 'react';

// React Native
import {View, Text} from 'react-native';

// Redux
import { connect } from 'react-redux';
import * as actions from '../actions';

// Navigation
import {DECKLIST, DECKDETAILS} from '../views/Navigator';

// Components
import TextField from '../components/TextField';
import Button from '../components/Button';

// API
import API from '../api';

// Helpers
import {generateId} from '../utils';

class CreateDeck extends React.Component {

  constructor(props) {
    super(props);

    this.state = {deckName: ''};
    this.onPressCreate = this.onPressCreate.bind(this)
  }

  static navigationOptions = ({navigation}) => ({
    title: 'Create New Deck'
  })

  onPressCreate() {
    const {deckName} = this.state;

    API.createDeck(generateId(), deckName).then(deck => {
      this.props.addDeck({type: actions.ADD_DECK, deck});
      this.goBack(deck);
    })
  }

  goBack(deck) {
    const {goBack, updater, navigate} = this.props;
    updater()
    goBack()
    navigate(DECKDETAILS, {deck: deck, updater: updater});
  }

  render() {
    const {deckName} = this.state;
    const disabled = deckName.trim().length === 0;

    return (
      <View>
        <TextField
          placeholder='Deck Name'
          value={deckName}
          onChangeText={text => this.setState({deckName: text})}
        />
        <Button title='Create' onPress={this.onPressCreate} disabled={disabled}/>
      </View>
    )
  }

}


function mapStateToProps({decks}, {navigation}) {
  return {decks};
}

function mapDispatchToProps(dispatch, {navigation}) {
  return {
    addDeck: deck => dispatch(actions.addDeck(deck)),
    goBack: navigation.goBack,
    updater: navigation.state.params.updater,
    navigate: navigation.navigate
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateDeck);
