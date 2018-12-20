import React from 'react';
import { connect } from 'react-redux';
import Header from './Header/Header';
import ProductSpace from './ProductsSpace/ProductSpace';
import Loading from './Loading';
import { Filter } from './Filters/Filter';
import { getProducts, getFilteredProducts } from '../reducers/action-creators';

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: true,
            user: {},
            productName: '',
            categories: [],
            shops: [],
            logIn: false
        };
    }

    specificSearch = (name) => {
        this.setState({productName: name});
    };

    filterShop = (shops) => {
        this.setState({shops: shops});
    };

    filterCategory = (categories) => {
        this.setState({categories: categories});
    };

    componentWillMount() {
        this.props.getProducts();
    };

    filterProducts = () => {
        this.props.getFilteredProducts(this.state.shops, this.state.categories, this.state.productName);
    };

    render() {
        return (
            <div style={{
                padding: '5px',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            }}>
                <Header change={this.specificSearch} newfilter={this.filterProducts} loggedIn={this.props.loggedIn} />
                <Filter filterShop={this.filterShop} filterCategory={this.filterCategory}/>
                {this.props.isLoading ?
                    <Loading /> :
                    <ProductSpace productList={this.props.productList} loggedIn={this.props.loggedIn}/>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        productList: state.getIn(['reducerProduct', 'productList']),
        isLoading: state.getIn(['reducerProduct', 'view', 'isLoading']),
        loggedIn: state.getIn(['reducerUser', 'isLogged'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getProducts: () => dispatch(getProducts()),
        getFilteredProducts: (shops, categories, name) => dispatch(getFilteredProducts(shops, categories, name))
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
