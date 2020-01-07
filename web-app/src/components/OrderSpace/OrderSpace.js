import React from 'react';
import Order from './Order';
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
import { addOrder } from "../../reducers/action-creators";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ProductContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            newProduct: false,
            productDetail: false,
            newOrderDialog: {
                name: String,
                userId: props.userId
            }
        };
    }

    validateDetails = () => {
        const order = {
            orderId: 0,
            userId: this.props.userId,
            name: this.state.newOrderDialog.name
        };
        this.props.addOrder(order.orderId, order.userId, order.name);
    };

    newOrderStateChange = (evt) => {
        const target = evt.target;
        const name = target.name;
        const value = target.value;

        const newOrderDialog = {...this.state.newOrderDialog};
        newOrderDialog[name] = value;
        this.setState({newOrderDialog});
    };

    openNewDialog = () => {
        this.setState({ newProduct: true });
    };

    closeNewDialog = () => {
        this.setState({ newProduct: false });
    };

    render() {
        const orderList = this.props.orderList;
        return (
            <div className={'row'} style={{
                display: 'block'
            }}>

                {orderList.map(order => <Order id={order.orderId} {...order}/>)}

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
                        {"Dodaj nową grupę ulubionych"}
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
                                onBlur={this.newOrderStateChange}
                                helperText="Wpisz nazwe grupy ulubionych"
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
        addOrder: (orderId, userId, name) => dispatch(addOrder(orderId, userId, name))
    }
}

export const OrderSpace = connect(mapStateToProps, mapDispatchToProps)(ProductContainer);
