import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Registration from "./Registration/Registration";
import Login from "./login/login"
import Forgot from "./Forgot/Forgot"
import Main from "./Main/Main"
import NewPost from "./NewPost/NewPost"
import Profile from "./Profile/Profile"
import Settings from "./Settings/Settings"
import ChangePassword from "./ChangePassword/ChangePassword"
function App() {
  return (
      <Router>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Registration" component={Registration} />
            <Route exact path="/forgot" component={Forgot} />
            <Route exact path="/NewPost" component={NewPost} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/ChangePassword" component={ChangePassword} />
        </Switch>
      </Router>
  );
}

export default App;
