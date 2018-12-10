import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AccountsUIWrapper from "./AccountsUIWrapper";
import Home from "./Home";
import CustomerPage from "./CustomerPage";
import About from "./About";

class App extends Component{
  render(){
    return(
      <Router>
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
            <div style={{width: 200, borderRightStyle: 'solid', borderRightColor: 'grey', borderRightWidth: 1}}>
              <ul className="nav flex-column">
                <li className="nav-item">
                  <AccountsUIWrapper/>
                </li>
                <li className="nav-item">
                  <Link to="/">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/customers">Customers</Link>
                </li>
                <li className="nav-item">
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </div>
          <Route exact path="/" component={Home} />
          <Route path="/customers" component={CustomerPage} />
          <Route path="/about" component={About} />
        </div>
      </Router>
    );
  }
}
export default App;