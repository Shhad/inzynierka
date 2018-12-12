import React from 'react';
import Product from './Product';
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
import { addProduct } from "../../reducers/action-creators";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default class ProductContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            newProduct: false,
            productDetail: false,
            newProductDialog: {
                name: '',
                description: '',
                shop: 0,
                category: 0,
                price: 0.00,
                currency: '',
                url: '',
                link: ''
            },
            name: '',
            description: '',
            shop: 0,
            category: 0,
            price: 0.00,
            currency: '',
            url: '',
            link: ''
        };
    }

    componentWillMount() {
        console.log(this.props.productList);
    }

    validateDetails = () => {
        console.log('Checking if everything is writen correctly');
        console.log(this.state.newProductDialog.name);
        console.log(this.state.newProductDialog.description);
        console.log(this.state.newProductDialog.category);
        console.log(this.state.newProductDialog.shop);
        console.log(this.state.newProductDialog.price);
        console.log(this.state.newProductDialog.currency);
        console.log(this.state.newProductDialog.url);
        console.log(this.state.newProductDialog.link);
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

    render() {
        const productList = this.props.productList;

        return (
            <div className={'row'}>
                {productList.map(product => <Product id={product.id} {...product}/>)}

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
                                autoFocus
                                id="new-product-shop"
                                name='shop'
                                label="Sklep"
                                onBlur={this.newProductStateChange}
                                helperText="Wpisz sklep w którym znajduje się produkt"
                                margin="normal"
                                style={{
                                    width: '400px'
                                }}
                            />
                            <TextField
                                autoFocus
                                id="new-product-category"
                                name='category'
                                label="Kategoria"
                                onBlur={this.newProductStateChange}
                                helperText="Wpisz kategorię"
                                margin="normal"
                                style={{
                                    width: '400px'
                                }}
                            />
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
                                id="new-product-url"
                                name='url'
                                label="Link do zdjęcia"
                                onBlur={this.newProductStateChange}
                                helperText="Podaj link do zdjęcia"
                                type='url'
                                margin="normal"
                                style={{
                                    width: '400px'
                                }}
                            />
                            <TextField
                                autoFocus
                                id="new-product-link"
                                name='link'
                                label="Link do sklepu"
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
        productList: state.get('productList'),
        isLoading: state.getIn(['view', 'isLoading'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addProduct: () => dispatch(addProduct())
    }
}


