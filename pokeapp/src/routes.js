import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from '../src/pages/Home';
import MeusPokemons from '../src/pages/MeusPokemons';

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
