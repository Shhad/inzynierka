import {
    put,
    takeLatest
} from 'redux-saga/effects';

const getUserParams = () => {
    const data = {
        userid: 1,
        name: 'Adam',
        surname: 'Nieadminowicz',
        login: 'loginek',
        password: 'haselko',
        email: 'xd@xd.pl',
        isAdmin: false
    };
    console.log(data);
    return data;
};

const addUser = (user) => {
    const resposne = {
        status: 'ok'
    };
    return resposne;
};

const modifyUser = (user) => {
    const resposne = {
        status: 'ok'
    };
    return resposne;
};

function* loadUser () {
    try {
        const userParams = yield getUserParams();
        yield put({ type: 'GET_USER_SUCCESS', payload: userParams});
    } catch (e) {
        yield put({type: 'GET_USER_FAILURE', payload: e});
    }
}

function* addUserFunction(user) {
    try {
        yield addUser(user);
        yield put({ type: 'ADD_USER_SUCCESS'});
    } catch (e) {
        yield put({ type: 'ADD_USER_FAILURE', payload: e});
    }
}

function* modifyUserFunction(user) {
    try {
        yield modifyUser(user);
        yield put({ type: 'ADD_USER_SUCCESS'});
    } catch (e) {
        yield put({ type: 'ADD_USER_FAILURE', payload: e});
    }
}

function* watchGetUser() {
    yield takeLatest('GET_USER', loadUser);
}

export default function* userSaga() {
    yield [
        watchGetUser()
    ]
}
