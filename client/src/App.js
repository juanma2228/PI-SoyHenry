import './App.css';
import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Nav from './components/Nav/Nav';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Details from './components/Detail/Details';
import Form from './components/Form/Form';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/form' component={Form} />  
        <>
        <Nav component={Nav} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/home/:id' component={Details} />
        </>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
