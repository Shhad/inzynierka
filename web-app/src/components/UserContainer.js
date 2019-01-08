import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from './Header/Header';
import history from '../history';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { getUser, modifyUser, modifyUserPassword } from '../reducers/action-creators';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

class UserContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            saveButton: false,
            modifyButton: true,
            newUser: {
                name: this.props.userData.name,
                surname: this.props.userData.surname,
                mail: this.props.userData.mail,
                login: this.props.userData.login,
            },
            oldPass: '',
            newPass: ''
        };
        if(!this.props.loggedIn) {
            history.push('/')
        }
    }

    componentDidMount() {
        this.props.getUser();
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleClickModify = () => {
        this.setState({ modifyButton: false});
    };

    handleClickSave = () => {
        const user = this.state.newUser;
        user.password = this.props.userData.password;
        user.userId = this.props.userData.userId;
        if(user.login == '') user.login = this.props.userData.login;
        if(user.name == '') user.login = this.props.userData.name;
        if(user.surname == '') user.login = this.props.userData.surname;
        if(user.mail == '') user.login = this.props.userData.mail;
        console.log(user);
        this.props.modifyUser(user);
    };

    handleClickCanel = () => {
        this.setState({ modifyButton: true });
    };

    newUserChange = (evt) => {
        const target = evt.target;
        const name = target.name;
        const value = target.value;

        const newUser = {...this.state.newUser};
        newUser[name] = value;
        this.setState({newUser});
    };

    handlePasswordChange = (evt) => {
        const value = evt.target.value;
        const name = evt.target.name;
        this.setState({[name]: value});
    };

    handleNewPass = () => {
        const user = this.props.userData;
        user.password = this.state.newPass;
        user.name = this.props.userData.name;
        user.surname = this.props.userData.surname;
        user.mail = this.props.userData.mail;
        user.userId = this.props.userData.userId;
        user.login = this.props.userData.login;
        this.props.modifyUserPassword(user);
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div>
                <Header loggedIn={this.props.loggedIn} />
                <AppBar style={{
                    position: 'static',
                    maxWidth: '800px',
                    margin: '0 auto',
                }}>
                    <Tabs value={value} onChange={this.handleChange}
                          fullWidth
                    >
                        <Tab label="Dane konta" />
                        <Tab label="Zmiana hasła" />
                    </Tabs>
                </AppBar>
                {value === 0 &&
                    <div style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        maxWidth: '800px',
                        margin: '0 auto',
                        verticalAlign: 100
                    }}>
                <form style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '0 auto'
                }}
                      noValidate
                      autoComplete="off">
                    <TextField
                        disabled={this.state.modifyButton}
                        defaultValue={this.props.userData.name}
                        id="name-text"
                        name={"name"}
                        onBlur={this.newUserChange}
                        label="Imię"
                        style={{
                            marginTop: '19px',
                            width: '400px',
                            margin: '0 auto',
                            padding: '10px'
                        }}
                    />
                    <TextField
                        disabled={this.state.modifyButton}
                        defaultValue={this.props.userData.surname}
                        id="surname-text"
                        name={"surname"}
                        onBlur={this.newUserChange}
                        label="Nazwisko"
                        style={{
                            marginTop: '19px',
                            width: '400px',
                            margin: '0 auto',
                            padding: '10px'
                        }}
                    />
                    <TextField
                        disabled={this.state.modifyButton}
                        defaultValue={this.props.userData.login}
                        id="login-text"
                        name={"login"}
                        onBlur={this.newUserChange}
                        label="Login"
                        style={{
                            marginTop: '19px',
                            width: '400px',
                            margin: '0 auto',
                            padding: '10px'
                        }}
                    />
                    <TextField
                        disabled={this.state.modifyButton}
                        defaultValue={this.props.userData.mail}
                        id="email-text"
                        name={"mail"}
                        onBlur={this.newUserChange}
                        label="Mail"
                        style={{
                            marginTop: '19px',
                            width: '400px',
                            margin: '0 auto',
                            padding: '10px'
                        }}
                    />
                </form>
                    </div>
                }
                {value === 0 &&
                    <div style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        maxWidth: '800px',
                        margin: '0 auto',
                        verticalAlign: 100
                    }}>

                        {this.state.modifyButton &&
                            <Button onClick={this.handleClickModify} style={{
                                margin: '0 auto',
                                border: '5px',
                                borderColor: '#A59A9A',
                                backgroundColor: '#3f51b5'
                            }}>
                                <h4 style={{color: 'white'}}>Modyfikuj</h4>
                            </Button>
                        }
                        {!this.state.modifyButton &&
                            <Button onClick={this.handleClickSave} style={{
                                padding: '10px',
                                margin: '10px',
                                border: '5px',
                                borderColor: '#A59A9A',
                                backgroundColor: '#3f51b5'
                            }}>
                                <h4 style={{color: 'white'}}>Zapisz</h4>
                            </Button>
                        }
                        {!this.state.modifyButton &&
                            <Button onClick={this.handleClickCanel} style={{
                                padding: '10px',
                                margin: '10px',
                                border: '5px',
                                borderColor: '#A59A9A',
                                backgroundColor: '#3f51b5'
                            }}>
                                <h4 style={{color: 'white'}}>Anuluj</h4>
                            </Button>
                        }
                    </div>
                }
                {value === 1 &&
                <div style={{
                    alignContent: 'center',
                    alignItems: 'center',
                    maxWidth: '800px',
                    margin: '0 auto',
                    verticalAlign: 100
                }}>
                    <form style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        margin: '0 auto'
                    }}
                          noValidate
                          autoComplete="off">
                        <TextField
                            id="name-text"
                            name="oldPass"
                            onBlur={this.handlePasswordChange}
                            label="Stare haslo"
                            style={{
                                marginTop: '19px',
                                width: '400px',
                                margin: '0 auto',
                                padding: '10px'
                            }}
                        />
                        <TextField
                            id="surname-text"
                            name="newPass"
                            onBlur={this.handlePasswordChange}
                            label="Nowe haslo"
                            style={{
                                marginTop: '19px',
                                width: '400px',
                                margin: '0 auto',
                                padding: '10px'
                            }}
                        />
                    </form>
                    <Button onClick={this.handleNewPass}>
                        Zmien haslo
                    </Button>
                </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userData: state.getIn(['reducerUser','user']),
        loggedIn: state.getIn(['reducerUser', 'isLogged'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: () => dispatch(getUser()),
        modifyUser: (user) => dispatch(modifyUser(user)),
        modifyUserPassword: (user) => dispatch(modifyUserPassword(user))
    }
}

export const User = connect(mapStateToProps, mapDispatchToProps)(UserContainer);
