import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './App'
import './index.css'

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
        </Route>
        <Route path='*' component={notFound}/>
    </Router>,
    document.getElementById('root'),
)

function notFound(props) {
    return (
        <div>
            <h1>Sorry, we couldn't find that for which you are looking.</h1>
            <h2>¯\_(ツ)_/¯</h2>
        </div>
    )
}

function Home(props) {
    return (
        <div>
            <h1>Hello world</h1>
            <h2>¯\_(ツ)_/¯</h2>
        </div>
    )
}
