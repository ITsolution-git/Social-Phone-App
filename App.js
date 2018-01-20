// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your appFFFF!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer menu.</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import React from "react";
// import Setup from "./src/boot/setup";


// export default class App extends React.Component {
//   render() {
//     return <Setup />;
//   }
// }


import React from "react";
import Root from './src/Root'

export default class App extends React.Component {
  render() {
    return <Root />;
  }
}