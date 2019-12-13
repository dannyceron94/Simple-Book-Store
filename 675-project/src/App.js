import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from "./Homepage";
import Items from "./Items";
import Users from "./Users";


function App() {

  return (
    <Router>
      <div >

        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          {/* <a class="navbar-brand" href="#">Navbar</a> */}
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/products">Products</a>
              </li>
              <li class="righty">
                <a class="nav-link" href="/users">Orders</a>
              </li>
              {/* <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
              </li> */}
            </ul>
          </div>
        </nav>

        
      </div>
      <Switch>
          <Route path="/products">
            <Items/>
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      
    </Router>
  );
}

export default App;
