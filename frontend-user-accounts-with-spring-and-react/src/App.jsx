import React, { Component } from 'react';
import UsersList from './components/UsersList';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import User from './components/User';

class App extends Component {
    render() {
        return (
            <Router>
                <>
                    <h1>User Accounts Application</h1>
                    <Switch>
                        <Route path="/" exact component={UsersList} />
                        <Route path="/users" exact component={UsersList} />
                        <Route path="/users/:id" component={User} />
                    </Switch>
                </>
            </Router>
        )
    }
}

export default App