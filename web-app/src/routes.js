import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import testc from './components/Test1';
import AppC from './components/AppContainer';

const MAIN_WORKSPACE = '/promotion';

export default (
    <Route component={AppC} path="/">
        <Route path='/xd' component={testc} />
    </Route>
);
