import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Nav from './Nav'
import PageNotFound from './PageNotFound'
import HelloWorld from './HelloWorld'
import FungShow from './FungShow'
import FungPredict from './FungPredict'

// Define a React App component here. A component may have:
// - state
// - lifecycle event (e.g. appear / disappear from screen)
// - UI
class App extends React.Component {
  render = () => {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path='/' component={HelloWorld} />
            <Route path='/helloworld' component={HelloWorld} />
            <Route path='/fungshow' component={FungShow} />
            <Route path='/fungpredict' component={FungPredict} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App