import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./../login/loginPage";
import App from "./../App";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/contactList" component={App} />
            <Route path="" component={LoginPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default MainPage;
