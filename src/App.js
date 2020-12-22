import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import CustomerList from "./containers/CustomerList";
import CustomerPage from "./containers/CustomerPage";

function App() {
  return (
    <Switch>
      <Route path={"/"} exact component={CustomerList} />
      <Route path={"/customer/:id"} exact component={CustomerPage} />
      <Redirect to={"/"} />
    </Switch>
  );
}

export default App;
