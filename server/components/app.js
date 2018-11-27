import 'rxjs/Rx';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { syncHistoryWithStore } from 'react-router-redux';

import { PageLoader } from './pageLoader/PageLoader';

render(
    <AppContainer>
        <PageLoader store={} history={}/>
    </AppContainer>,
    document.getElementById('app')
);
