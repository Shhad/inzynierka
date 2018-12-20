import React from 'react';
import { connect } from 'react-redux';
import Product from './Product';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import {addProduct, getShops, getCategories} from "../../reducers/action-creators";
import MenuItem from "@material-ui/core/MenuItem";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ProductContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            newProduct: false,
            productDetail: false,
            newProductDialog: {
                productId: 0,
                shopId: 0,
                categoryId: 0,
                name: '',
                description: '',
                price: 0.00,
                currency: '',
                link: ''
            },
            shop: '',
            category: ''
        };
    }

    componentWillMount() {
        getShops();
        getCategories();
    }

    validateDetails = () => {
        const newProduct = this.state.newProductDialog;
        let shopID;
        this.props.shopList.forEach(shop => {
            if(shop.name == this.state.shop) {
                console.log('znaleziony sklep')
                shopID = shop.shopId;
            }
        });
        newProduct.shopId = shopID;
        let catID;
        this.props.categoryList.forEach(shop => {
            if(shop.name == this.state.category) {
                console.log('znaleziony sklep')
                catID = shop.categoryId;
            }
        });
        newProduct.categoryId = catID;
        this.props.addProduct(newProduct);
    };

    newProductStateChange = (evt) => {
        const target = evt.target;
        const name = target.name;
        const value = target.value;

        const newProductDialog = {...this.state.newProductDialog};
        newProductDialog[name] = value;
        this.setState({newProductDialog});
    };

    openNewDialog = () => {
        this.setState({ newProduct: true });
    };

    closeNewDialog = () => {
        this.setState({ newProduct: false });
    };

    handleShopChange = (event) => {
        const target = event.target;
        const value = target.value;

        this.setState({shop: value});
    };

    handleCategoryChange = (event) => {
        const target = event.target;
        const value = target.value;

        this.setState({category: value});
    };

    render() {
        const productList = this.props.productList;

        return (
            <div className={'row'}>
                {productList.map(product => <Product loggedIn={this.props.loggedIn} shopId={product.shopId} {...product}/>)}

                {this.props.loggedIn && <Fab style={{
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
                </Fab>}


                <Dialog
                    open={this.state.newProduct}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.closeNewDialog}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"Dodaj nowy produkt"}
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
                                onBlur={this.newProductStateChange}
                                helperText="Wpisz nazwe produktu"
                                margin="normal"
                                style={{
                                    width: '400px'
                                }}
                            />
                            <TextField
                                id="new-product-descr"
                                name='description'
                                label="Opis"
                                onBlur={this.newProductStateChange}
                                helperText="Wpisz opis produktu"
                                margin="normal"
                                fullWidth
                                multiline
                            >
                            </TextField>
                            <TextField
                                id="standard-select-currency"
                                select
                                label="Sklep"
                                value={this.state.shop}
                                onChange={this.handleShopChange}
                                helperText="Wybierz sklep"
                                margin="normal"
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
                            <TextField
                                id="standard-select-currency"
                                select
                                label="Kategoria"
                                value={this.state.category}
                                onChange={this.handleCategoryChange}
                                helperText="Wybierz kategorię"
                                margin="normal"
                                style={{
                                    marginTop: '19px',
                                    width: '400px',
                                    padding: '10px'
                                }}
                            >
                                {this.props.categoryList.map(option => (
                                    <MenuItem key={option.name} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                autoFocus
                                id="new-product-price"
                                name='price'
                                label="cena"
                                onBlur={this.newProductStateChange}
                                helperText="Wprowadź cenę produktu"
                                type='number'
                                margin="normal"
                                style={{
                                    width: '400px'
                                }}
                            />
                            <TextField
                                autoFocus
                                id="new-product-currency"
                                name='currency'
                                label="Waluta"
                                onBlur={this.newProductStateChange}
                                helperText="Wpisz walutę"
                                margin="normal"
                                style={{
                                    width: '400px'
                                }}
                            />
                            <TextField
                                autoFocus
                                id="new-product-link"
                                name='link'
                                label="Link do zdjęcia"
                                onBlur={this.newProductStateChange}
                                type='url'
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
        productList: state.getIn(['reducerProduct', 'productList']),
        shopList: state.getIn(['reducerShop', 'shopList']),
        categoryList: state.getIn(['reducerCategory', 'categoryList']),
        isLoading: state.getIn(['reducerProduct', 'view', 'isLoading'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getShops: () => dispatch(getShops()),
        getCategories: () => dispatch(getCategories()),
        addProduct: (product) => dispatch(addProduct(product))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);


