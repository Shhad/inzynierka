import React from 'react';
import {getShops, getCategories, getFavourites, addFavouriteProduct } from '../../reducers/action-creators';
import { connect } from 'react-redux';
import { modifyProduct } from '../../reducers/action-creators';

//Material UI components
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FlatButton from '@material-ui/core/Button'
import Favorite from '@material-ui/icons/Favorite'
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';

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
            open: false,
            modifyButton: true,
            name: this.props.name,
            description: this.props.description,
            price: this.props.price,
            shopid: this.props.shopId,
            shop: '',
            shops: [],
            favourite: '',
            openFavourite: false
        };
    }

    componentWillMount() {
        this.props.getShops();
        this.props.getFavourites(this.props.userId);
        let name;
        this.props.shopList.forEach(shop => {
            if (this.props.shopId == shop.shopId) {
                name = shop.name;
            }
        });
        this.setState({shop: name});
    }

    handleModifyButton = () => {
        this.setState({modifyButton: false});
    };

    handleCancel = () => {
        this.setState({modifyButton: true});
    };

    handleSave = () => {
        const product = {
            productId: this.props.productId,
            categoryId: this.props.categoryId,
            shopId: this.props.shopId,
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            currency: this.props.currency,
            link: this.props.link
        };
        let shopID;
        this.props.shopList.forEach(shop => {
            if(shop.name == this.state.shop) {
                console.log('znaleziony sklep')
                shopID = shop.shopId;
            }
        });
        product.shopId = shopID;
        this.props.modifyProduct(product);
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleShopChange = (event) => {
        const target = event.target;
        const value = target.value;

        this.setState({shop: value});
    };

    handleFavourite = () => {
        const productId = this.props.shopId;
        let favouriteId;
        this.props.favouriteList.forEach(favourite => {
            console.log(favourite.name);
            if(favourite.name === this.state.favourite) {
                favouriteId = favourite.favouriteId;
            }
        });
        this.props.addFavouriteProduct(productId, favouriteId);
    };

    handleFavouriteChange = (event) => {
        const value = event.target.value;
        this.setState({favourite: value})
    };

    handleOpenFavourite = () => {
        this.setState({openFavourite: true})
    };

    handleCloseFavourite = () => {
        this.setState({openFavourite: false})
    };

    render() {
        const { productid, url, name,  desc, shop } = this.props;
        const price = 'Cena: ' + this.props.price + ' ' + this.props.currency;
        const shopp = 'Sklep: ' + this.state.shop;
        return (
            <div style={{
                float: 'left',
                margin: '20px'
            }}>
                <Card style={{width: '345px'}} >
                    <CardActionArea>
                        <CardMedia
                            style={{
                                height: '140px'
                            }}
                            image={this.props.link}
                            title="Shopping"
                        />
                        <CardContent style={{
                            height: '120px'
                        }}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.name}
                            </Typography>
                            <Typography component="h3">
                                {price}
                            </Typography>
                            <Typography component="h3">
                                {shopp}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button onClick={this.handleClickOpen} size="small" color="primary">
                            Więcej
                        </Button>
                    </CardActions>
                </Card>

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
                        <DialogContentText style={{
                            margin: 'auto'
                        }}>
                            <img src={this.props.url} alt={'Product pic'} style={{
                                width: '100%',
                                maxWidth: '300px',
                                margin: 'auto'
                            }}/>
                        </DialogContentText>
                        <Divider/>
                        <form style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            margin: '0 auto'
                        }}
                              noValidate
                              autoComplete="off">
                            <TextField
                                disabled={this.state.modifyButton}
                                onBlur={this.handleChange('name')}
                                value={this.props.name}
                                id="name-text"
                                label="Nazwa"
                                style={{
                                    marginTop: '19px',
                                    width: '400px',
                                    padding: '10px'
                                }}
                            />
                            <TextField
                                disabled={this.state.modifyButton}
                                onBlur={this.handleChange('description')}
                                defaultValue={this.props.description}
                                id="descr-text"
                                label="Opis"
                                style={{
                                    marginTop: '19px',
                                    width: '400px',
                                    padding: '10px'
                                }}
                            />
                            <TextField
                                disabled={this.state.modifyButton}
                                defaultValue={this.props.price}
                                onBlur={this.handleChange('price')}
                                id="price-text"
                                type="number"
                                label="Cena"
                                style={{
                                    marginTop: '19px',
                                    width: '400px',
                                    padding: '10px'
                                }}
                            />
                            <TextField
                                disabled={this.state.modifyButton}
                                id="standard-select-currency"
                                select
                                label="Sklep"
                                value={this.state.shop}
                                onChange={this.handleShopChange}
                                helperText="Wybierz sklep"
                                style={{
                                    marginTop: '19px',
                                    width: '400px',
                                    padding: '10px'
                                }}
                            >
                                {this.props.shopList.map(option => (
                                    <MenuItem key={option.name} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        {this.state.modifyButton &&
                        <Button onClick={this.handleClose} color="primary">
                            Ok
                        </Button>
                        }
                        {this.props.loggedIn && this.state.modifyButton &&
                        <Button color='primary' onClick={this.handleModifyButton}>
                            Modyfikuj
                        </Button>
                        }
                        {this.props.loggedIn && this.state.modifyButton &&
                            <FlatButton>
                            <Favorite onClick={this.handleOpenFavourite}/>
                            </FlatButton>
                        }
                        {!this.state.modifyButton &&
                        <Button onClick={this.handleSave} color="primary">
                            Zapisz
                        </Button>
                        }
                        {!this.state.modifyButton &&
                        <Button onClick={this.handleCancel} color="primary">
                            Anuluj
                        </Button>
                        }

                    </DialogActions>
                </Dialog>
                <Dialog
                    open={this.state.openFavourite}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleCloseFavourite}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        Wybierz grupę
                    </DialogTitle>
                    <DialogContent>
                        <Divider/>
                        <form style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            margin: '0 auto'
                        }}
                              noValidate
                              autoComplete="off">
                            {(this.props.favouriteList.length > 0) &&
                            <TextField
                                id="standard-select-currency"
                                select
                                label="Wybierz grupę"
                                value={this.state.favourite}
                                onChange={this.handleFavouriteChange}
                                style={{
                                    marginTop: '19px',
                                    width: '400px',
                                    padding: '10px'
                                }}
                            >
                                {this.props.favouriteList.map(option => (
                                    <MenuItem key={option.name} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            }
                            {(this.props.favouriteList.length == 0) &&
                                <TextField
                                    disabled={true}
                                    value={'Brak grup ulubionych! \n Dodaj grupy!'}
                                    style={{
                                        marginTop: '19px',
                                        width: '400px',
                                        padding: '10px'
                                    }}
                                    label={'Ważne'}
                                >

                                </TextField>
                            }
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleFavourite} color="primary">
                            OK
                        </Button>
                        <Button onClick={this.handleCloseFavourite} color="primary">
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
        shopList: state.getIn(['reducerShop', 'shopList']),
        favouriteList: state.getIn(['reducerFavourite', 'favouriteList']),
        userId: state.getIn(['reducerUser', 'user', 'userId'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getShops: () => dispatch(getShops()),
        modifyProduct: (product) => dispatch(modifyProduct(product)),
        getFavourites: (userId) => dispatch(getFavourites(userId)),
        addFavouriteProduct: (productId, favouriteId) => dispatch(addFavouriteProduct(productId, favouriteId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Product));
