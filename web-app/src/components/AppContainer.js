import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from './Header/Header';
import ProductSpace from './ProductsSpace/ProductSpace';
import Loading from './Loading';
import { Filter } from './Filters/Filter';

import { getProducts } from '../reducers/action-creators';

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: true,
            user: false,
            productName: ''
        };
    }

    specificSearch = (name) => {
        console.log(name);
        this.setState({productName: name});
        console.log(this.state.productName);
    };

    componentWillMount() {
        this.props.getProducts();
    }

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
                <Header change={this.specificSearch} />
                <h1>Filtry</h1>
                <Filter />
                {this.props.isLoading ?
                    <Loading /> :
                    <ProductSpace productList={this.props.productList} />
                }
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        productList: state.getIn(['reducerProduct', 'productList']),
        isLoading: state.getIn(['reducerProduct', 'view', 'isLoading'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getProducts: () => dispatch(getProducts())
    }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer);
