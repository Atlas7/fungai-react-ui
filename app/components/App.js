import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PageNotFound from './PageNotFound'
import Nav from './Nav'
import Home from './Home'
import Battle from './Battle'
import Results from './Results'
import Popular from './Popular'
import HelloWorld from './HelloWorld'
import FungShow from './FungShow'

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
            <Route exact path='/' component={Home} />
            <Route exact path='/battle' component={Battle} />
            <Route path='/battle/results' component={Results} />
            <Route path='/popular' component={Popular} />
            <Route path='/helloworld' component={HelloWorld} />
            <Route path='/fungshow' component={FungShow} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App