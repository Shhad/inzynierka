import React from 'react';
import Favourite from './Order';
import { connect } from 'react-redux';

import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add';
import FlatButton from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import { addFavourite } from "../../reducers/action-creators";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ProductContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newProduct: false,
            productDetail: false,
            newFavouriteDialog: {
                name: String,
                userId: props.userId
            }
        };
    }

    validateDetails = () => {
        const favourite = {
            favouriteId: 0,
            userId: this.props.userId,
            name: this.state.newFavouriteDialog.name
        };
        this.props.addFavourite(favourite.favouriteId, favourite.userId, favourite.name);
    };

    newFavouriteStateChange = (evt) => {
        const target = evt.target;
        const name = target.name;
        const value = target.value;

        const newFavouriteDialog = {...this.state.newFavouriteDialog};
        newFavouriteDialog[name] = value;
        this.setState({newFavouriteDialog});
    };

    openNewDialog = () => {
        this.setState({ newProduct: true });
    };

    closeNewDialog = () => {
        this.setState({ newProduct: false });
    };

    render() {
        const favouriteList = this.props.favouriteList;
        return (
            <div className={'row'} style={{
                display: 'block'
            }}>

                {favouriteList.map(favourite => <Favourite id={favourite.favouriteId} {...favourite}/>)}

                <Fab style={{
                    margin: 0,
                    top: 'auto',
                    right: 20,
                    bottom: 20,
                    left: 'auto',
                    position: 'fixed',
                    color: '#000000',
                    backgroundColor: '#F24F4F'
                }} onClick={this.openNewDialog}>
                    <AddIcon />
                </Fab>

                <Dialog
                    open={this.state.newProduct}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.closeNewDialog}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Dodaj nowe zamówienie"}
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
                                label="Nazwa"
                                onBlur={this.newFavouriteStateChange}
                                helperText="Wpisz nazwę zamóienia"
                                margin="normal"
                                style={{
                                    width: '400px'
                                }}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.validateDetails} color="primary">
                            Dodaj
                        </Button>
                        <Button onClick={this.closeNewDialog} color="primary">
                            Anuluj
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.getIn(['reducerUser', 'user', 'userId'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addFavourite: (favouriteId, userId, name) => dispatch(addFavourite(favouriteId, userId, name))
    }
}

export const OrderSpace = connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
