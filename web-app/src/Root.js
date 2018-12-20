/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import {Switch, Route, Router} from 'react-router';

import { App } from "./components/AppContainer";
import { User } from "./components/UserContainer";
import { FavouriteC } from "./components/FavouriteContainer";


export default class Root extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            logIn: false
        }
    }

    static propTypes = {
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        return (
            <Provider store={this.props.store}>
                    <Router history={this.props.history}>
                        <div>
                            <Switch>
                                <Route exact path="/" component={App}/>
                                <Route path="/userpanel" component={User}/>
                                <Route path="/favourite" component={FavouriteC}/>
                            </Switch>
                        </div>
                    </Router>
            </Provider>
        );
    }

}
