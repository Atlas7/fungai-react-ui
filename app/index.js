import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';


import App from './components/App'

// Render the react component App, to the HTML component where id = 'app'
ReactDOM.render(
  <App />,
  document.getElementById('app')
)