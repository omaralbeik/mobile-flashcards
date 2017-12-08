// React
import React from 'react';

// React Native
import { StyleSheet, Text, View } from 'react-native';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers';

// Redux Store
const store = createStore(rootReducer);

// Views
import Navigator from './views/Navigator';

// Helpers
import {setLocalNotification} from './utils';


export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Navigator/>
        </View>
      </Provider>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
});
