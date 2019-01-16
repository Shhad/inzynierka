import React from 'react';
import PropTypes from 'prop-types';
import history from '../../history';
import { getUser, addUser, logout, getFavourites } from "../../reducers/action-creators";
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import FlatButton from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";

const VERSSION = '0.0.1';

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: String,
            anchorEl: null,
            mobileMoreAnchorEl: null,
            auth: this.props.loggedIn,
            login: '',
            password: '',
            loginDialog: false,
            addUser: false,
            newUserDialog: {
                userId: 0,
                name: '',
                surname: '',
                login: '',
                password: '',
                mail: '',
                admin: false
            }
        };
    }

    handleChangeSearch = (event) => {
        const target = event.target;
        const value = target.value;
        console.log(value);
        this.setState({search: value});
    };

    sendChangeSearch = () => {
        this.props.change(this.state.search);
    };

    handleOpenRegisterDialog = () => {
        this.setState({addUser: true});
    };

    handleCloseRegisterDialog = () => {
        this.setState({addUser: false});
    };

    handleRegister =() => {
        this.props.addUser(this.state.newUserDialog);
        this.handleCloseRegisterDialog();
    };

    newUserStateChange = (evt) => {
        const target = evt.target;
        const name = target.name;
        const value = target.value;

        const newUserDialog = {...this.state.newUserDialog};
        newUserDialog[name] = value;
        this.setState({newUserDialog});
    };

    handleOpenLoginDialog = () => {
        this.setState({loginDialog: true});
    };

    handleCloseLoginDialog = () => {
        this.setState({loginDialog: false});
    };

    handleLogin =() => {
        this.props.getUser(this.state.login, this.state.password);
        this.props.handleLogin();
        this.handleCloseLoginDialog();
    };

    handleChangeSt = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    passHandleChangeSearch = () => {
        this.props.newfilter();
    };

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.props.logout();
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    goToFavourites = () => {
        history.push('/favourite');
    };

    goToUserProfile = () => {
        history.push('/userpanel');
    };

    goShopping = () => {
        history.push('/');
    };

    openNewWindow = () => window.open(window.location.href, '_blank');

    render() {
        const { anchorEl, mobileMoreAnchorEl, auth } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        const renderMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.goShopping}>Na zakupy!</MenuItem>
                <MenuItem onClick={this.goToFavourites}>Ulubione</MenuItem>
                <MenuItem onClick={this.goToUserProfile}>Konto</MenuItem>
                <MenuItem onClick={this.handleMenuClose}>Wyloguj</MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem>
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <MailIcon />
                        </Badge>
                    </IconButton>
                    <p>Messages</p>
                </MenuItem>
                <MenuItem>
                    <IconButton color="inherit">
                        <Badge badgeContent={11} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <p>Notifications</p>
                </MenuItem>
                <MenuItem onClick={this.handleProfileMenuOpen}>
                    <IconButton color="inherit">
                        <AccountCircle />
                    </IconButton>
                    <p>Profile</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>

                <AppBar position="static">
                    <Toolbar>
                        <FlatButton onClick={this.openNewWindow} style={{
                            height: '100%',
                            minWidth: '60px',
                            marginRight: '10px'
                        }}>
                            <ShoppingCart />
                        </FlatButton>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            ShopMe v0.0.1
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon} onClick={this.passHandleChangeSearch}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                onChange={this.handleChangeSearch}
                                onBlur={this.sendChangeSearch}
                            />
                        </div>
                        <FlatButton>
                            <h4 style={{
                                color: 'white',
                                marginRight: '5px'
                            }}>Szukaj  </h4>
                            <SearchIcon onClick={this.passHandleChangeSearch}/>
                        </FlatButton>
                        <div className={classes.grow} />
                        {this.props.userid &&
                        <div className={classes.sectionDesktop}>
                            <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </div>
                        }
                        {!this.props.userid &&
                            <div className={classes.sectionDesktop}>
                            <FlatButton style={{
                            borderColor: '#A59A9A'
                        }} onClick={this.handleOpenLoginDialog}>
                            <h3 style={{ color: 'white' }}>Zaloguj</h3>
                            </FlatButton>
                            </div>
                        }
                        {!this.props.userid &&
                        <div className={classes.sectionDesktop}>
                            <FlatButton style={{
                                borderColor: '#A59A9A'
                            }} onClick={this.handleOpenRegisterDialog}>
                                <h3 style={{ color: 'white' }}>Zarejestru</h3>
                            </FlatButton>
                        </div>
                        }
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMenu}
                <Dialog
                    open={this.state.loginDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleCloseLoginDialog}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        Zaloguj się
                    </DialogTitle>
                    <DialogContent>
                        <form style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            margin: '0 auto'
                        }}
                              noValidate
                              autoComplete="off">
                            <TextField
                                onBlur={this.handleChangeSt('login')}
                                value={this.props.name}
                                id="login"
                                label="Login"
                                style={{
                                    marginTop: '19px',
                                    width: '400px',
                                    padding: '10px'
                                }}
                            />
                            <TextField
                                onBlur={this.handleChangeSt('password')}
                                defaultValue={this.props.description}
                                type="password"
                                id="haslo"
                                label="Hasło"
                                style={{
                                    marginTop: '19px',
                                    width: '400px',
                                    padding: '10px'
                                }}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleLogin} color="primary">
                            Zaloguj
                        </Button>
                        <Button color='primary' onClick={this.handleCloseLoginDialog}>
                            Anuluj
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.addUser}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleCloseRegisterDialog}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Dodaj nowe konto"}
                    </DialogTitle>
                    <DialogContent style={{
                        display: 'inline',
                        overflowY: 'scroll'
                    }}>
                        <form>
                            <TextField
                                autoFocus
                                id="new-product-name"
                                name='name'
                                label="Imię"
                                onBlur={this.newUserStateChange}
                                helperText="Wpisz nazwe produktu"
                                margin="normal"
                                style={{
                                    width: '400px'
                                }}
                            />
                            <TextField
                                id="new-product-descr"
                                name='surname'
                                label="Nazwisko"
                                onBlur={this.newUserStateChange}
                                margin="normal"
                                fullWidth
                                multiline
                            >
                            </TextField>
                            <TextField
                                autoFocus
                                id="new-product-shop"
                                name='login'
                                label="Login"
                                onBlur={this.newUserStateChange}
                                margin="normal"
                                style={{
                                    width: '400px'
                                }}
                            />
                            <TextField
                                autoFocus
                                id="new-product-category"
                                name='password'
                                label="Hasło"
                                onBlur={this.newProductStateChange}
                                type="password"
                                margin="normal"
                                style={{
                                    width: '400px'
                                }}
                            />
                            <TextField
                                autoFocus
                                id="new-product-price"
                                name='password'
                                label="Powtórz hasło"
                                onBlur={this.newUserStateChange}
                                type='password'
                                margin="normal"
                                style={{
                                    width: '400px'
                                }}
                            />
                            <TextField
                                autoFocus
                                id="new-product-currency"
                                name='mail'
                                label="Mail"
                                onBlur={this.newUserStateChange}
                                margin="normal"
                                style={{
                                    width: '400px'
                                }}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRegister} color="primary">
                            Zarejestruj
                        </Button>
                        <Button onClick={this.handleCloseRegisterDialog} color="primary">
                            Anuluj
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        userid: state.getIn(['reducerUser', 'isLogged']),
        userId: state.getIn(['reducerUser', 'user', 'userId'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: (login, password) => dispatch(getUser(login, password)),
        addUser: (user) => dispatch(addUser(user)),
        logout: () => dispatch(logout()),
        getFavourites: (userId) => dispatch(getFavourites(userId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Header));
