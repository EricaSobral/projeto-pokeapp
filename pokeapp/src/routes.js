import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from './Home';
import MeusPokemons from './MeusPokemons';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/meuspokemons" component={MeusPokemons} />
      </Switch>
    </BrowserRouter>
  );
}
