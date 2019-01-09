import React from 'react';
import { Stack, Scene, Router } from 'react-native-router-flux';
import Home from './src/Components/Home';
import Main from './src/Components/Main';

const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="Home" component={Home} hideNavBar />
      <Scene key="Main" component={Main} hideNavBar />
    </Stack>
  </Router>
);

export default App;