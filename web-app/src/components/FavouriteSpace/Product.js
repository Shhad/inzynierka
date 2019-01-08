import React from 'react';
import { deleteFavouriteProduct, getFavourites } from "../../reducers/action-creators";
import { connect } from 'react-redux';

//Material UI components
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Clear from '@material-ui/icons/Clear';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
};

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDeleteProduct = () => {
        this.props.deleteFavourite(this.props.productId, this.props.favouriteId, this.props.userId);
        this.props.getFavourites(this.props.userId);
    };

    render() {
        return (
            <div style={{
                float: 'left',
            }}>
                <ListItem button style={{
                    width: '400px'
                }}>
                    <ListItemIcon onClick={this.handleClickOpen} >
                        <img src={this.props.url} alt={'Product pic'} style={{
                            maxHeight: '50px',
                            maxWidth: '50xp'
                        }}/>
                    </ListItemIcon>
                    <ListItemText inset onClick={this.handleClickOpen}  primary={this.props.name} />
                    <ListItemIcon onClick={this.handleDeleteProduct}>
                        <Clear/>
                    </ListItemIcon>
                </ListItem>
                <Divider/>

                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {this.props.name}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <img src={this.props.link} alt={'Product pic'} style={{
                                width: '100%',
                                maxWidth: '500px'
                            }}/>
                        </DialogContentText>
                        <Divider/>
                        <DialogContentText id={'product-price'} style={{
                            fontWeight: 800,
                            color: '#333333'
                        }}>
                            Cena: {this.props.price} {this.props.currency}
                        </DialogContentText>
                        <DialogContentText id ={'product-desc'} style={{
                            fontWeight: 600,
                            color: '#333333',
                            fontStyle: 'italic'
                        }}>
                            Opis:
                        </DialogContentText>
                        <DialogContentText id ={'product-desc'} style={{
                            fontWeight: 200,
                            color: '#333333',
                            fontStyle: 'italic'
                        }}>
                            {this.props.description}
                        </DialogContentText>

                        <DialogContentText id ={'product-desc'} style={{
                            fontWeight: 400,
                            color: '#333333',
                            fontStyle: 'italic'
                        }}>
                            {this.props.link}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Ok
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
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteFavourite: (productId, favouriteId, userId) => dispatch(deleteFavouriteProduct(productId, favouriteId, userId)),
        getFavourites: (userId) => dispatch(getFavourites(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Product));
