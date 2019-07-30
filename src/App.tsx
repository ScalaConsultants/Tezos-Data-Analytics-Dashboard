import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import './App.css';
import {useMappedState} from 'redux-react-hook';
import Routes from "./router/routes";

const mapState = (state: any) => ({
  auth: state.auth
});


const App = () => {
  const { auth } = useMappedState(mapState);

  return (
    <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>
  );
};

export default App;
