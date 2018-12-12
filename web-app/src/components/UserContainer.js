import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from './Header/Header';
import { fromJS } from 'immutable'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { getUser } from '../reducers/action-creators';

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
            modifyButton: true
        };
    }

    componentDidMount() {
        this.props.getUser();
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleClickModyfi = () => {
        this.setState({ modifyButton: false});
        this.rednderFrom();
        console.log('modyfing');
    };

    handleClickSave = () => {
        this.setState({ saveButton: false });
        this.setState({ modifyButton: true });
    };

    handleClickCanel = () => {
        this.setState({ saveButton: false });
        this.setState({ modifyButton: true });
    };

    handlePasswordChange = () => {
        console.log('password change');
    };

    rednderFrom() {
        return (
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
                defaultValue={this.props.userData.email}
                id="email-text"
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
        )
    }

    render() {
        const { classes } = this.props;
        const { value } = this.state;
        console.log(this.props.userData);

        return (
            <div>
                <Header/>
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
                {this.rednderFrom()} &&
                {value === 0 &&

                    <div style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        maxWidth: '800px',
                        margin: '0 auto',
                        verticalAlign: 100
                    }}>

                        {this.state.modifyButton &&
                            <Button onClick={this.handleClickModyfi} style={{
                                margin: '0 auto'
                            }}>
                                Modyfikuj
                            </Button>
                        }
                        {this.state.saveButton &&
                            <Button onClick={this.handleClickSave} style={{
                                padding: '10px'
                            }}>
                                Zapisz
                            </Button> &&
                            <Button onClick={this.handleClickCanel()} style={{
                                padding: '10px'
                            }}>
                                Anuluj
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
                            label="Nowe haslo"
                            style={{
                                marginTop: '19px',
                                width: '400px',
                                margin: '0 auto',
                                padding: '10px'
                            }}
                        />
                    </form>
                    <Button onClick={this.handlePasswordChange}>
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
        userData: state.getIn(['reducerUser','user'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: () => dispatch(getUser())
    }
}

export const User = connect(mapStateToProps, mapDispatchToProps)(UserContainer);
