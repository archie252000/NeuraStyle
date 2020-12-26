import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 

import {Landing} from './Components/Landing';
import {GetImages} from './Components/GetImages';




import './App.css';

function App() {
  return (
 
    <Router>
     <Fragment>
     <Route exact path = "/" component={Landing}></Route>
      <Switch>
      <Route exact path ="/get-images" component = {GetImages} />
     
      </Switch>
     </Fragment>
    </Router>

  );
}

export default App;
