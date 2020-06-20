// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import configureStore from "./App/Redux/Store";
const { persistor, store } = configureStore();
import FlashMessage from "react-native-flash-message";
import EntryPoint from './App/Screens/EntryPoint';


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <EntryPoint />
          {/* <Drawer /> */}
          <FlashMessage position="top" style={{ alignContent: "center", alignItems: "center" }}/>
        </PersistGate>
      </Provider>
    );
  }
}