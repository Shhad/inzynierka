import { combineEpics } from 'redux-observable';

import productsEpics from './productsEpics';

const rootEpic = combineEpics(
    productsEpics
);

export default rootEpic;
