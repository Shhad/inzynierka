import {
    put,
    takeLatest
} from 'redux-saga/effects';
import {SERWER_LOCAL} from "../constants/AppConstants";

const getUserParams = (login, pass) => {
    try {
        console.log('fetching with get user');
        const response = fetch(`${SERWER_LOCAL}/api/user/login`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: 0,
                name: '',
                surname: '',
                login: login,
                password: pass,
                mail: '',
                admin: false
            })
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                if(data.status === 'ok') {
                    console.log(data.data);
                    return data.data;
                } else {
                    console.log('not good');
                    return false;
                }
            })
            .catch(error => console.log(`Error occurred: ${error}.`));
        return response;
    } catch(e) {
        console.log(`Could not fetch data from ${SERWER_LOCAL}.`);
        return {};
    }
};

const addUser = (user) => {
    try {
        console.log('fetching with get user');
        const response = fetch(`${SERWER_LOCAL}/api/user/add`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: 0,
                name: user.name,
                surname: user.surname,
                login: user.login,
                password: user.password,
                mail: user.mail,
                admin: false
            })
        }).then(response => response.json())
            .then(data => {
                if(data.status === 'ok') {
                    console.log(data.data);
                    return data.data;
                } else {
                    console.log('not good');
                    return false;
                }
            })
            .catch(error => console.log(`Error occurred: ${error}.`));
        return response;
    } catch(e) {
        console.log(`Could not fetch data from ${SERWER_LOCAL}.`);
        return true;
    }
};

const modifyUser = (user) => {
    try {
        console.log('fetching with get user');
        const response = fetch(`${SERWER_LOCAL}/api/user/modify`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: user.userId,
                name: user.name,
                surname: user.surname,
                login: user.login,
                password: user.password,
                mail: user.mail,
                admin: false
            })
        }).then(response => response.json())
            .then(data => {
                if(data.status === 'ok') {
                    console.log(data.data);
                    return data.data;
                } else {
                    console.log('not good');
                    return false;
                }
            })
            .catch(error => console.log(`Error occurred: ${error}.`));
        return response;
    } catch(e) {
        console.log(`Could not fetch data from ${SERWER_LOCAL}.`);
        return true;
    }
};

function* loadUser (action) {
    try {
        const userParams = yield getUserParams(action.login, action.pass);
        if(userParams == false) {
            yield put({ type: 'GET_USER_WRONG' });
        } else {
            yield put({ type: 'GET_USER_SUCCESS', payload: userParams});
        }
    } catch (e) {
        yield put({type: 'GET_USER_FAILURE', payload: e});
    }
}

function* addUserFunction(action) {
    try {
        yield addUser(action.user);
        yield put({ type: 'ADD_USER_SUCCESS'});
    } catch (e) {
        yield put({ type: 'ADD_USER_FAILURE', payload: e});
    }
}

function* modifyUserFunction(action) {
    try {
        yield modifyUser(action.user);
        yield put({ type: 'ADD_USER_SUCCESS'});
    } catch (e) {
        yield put({ type: 'ADD_USER_FAILURE', payload: e});
    }
}

function* watchGetUser() {
    yield takeLatest('GET_USER', loadUser);
}

function* watchAddUser() {
    yield takeLatest('ADD_USER', addUserFunction);
}

function* watchModifyUser() {
    yield takeLatest('MODIFY_USER', modifyUserFunction);
}
export default function* userSaga() {
    yield [
        watchGetUser(),
        watchAddUser(),
        watchModifyUser()
    ]
}
