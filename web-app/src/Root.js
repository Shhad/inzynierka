/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import DevToolsView from './components/Views/DevToolsView';
import routes from './routes';


export default class Root extends React.Component {

    static propTypes = {
        store: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        if (DEV) {
            return (
                <Provider store={this.props.store}>
                    <div>
                        <Router history={this.props.history} routes={routes} />
                        <DevToolsView />
                    </div>
                </Provider>
            );
        }
        return (
            <Provider store={this.props.store}>
                <Router history={this.props.history} routes={routes} />
            </Provider>
        );
    }

}
