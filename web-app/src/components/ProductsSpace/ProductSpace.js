import React from 'react';
import Product from './Product';

export default class ProductContainer extends React.Component {

    render() {
        const { productList } = this.props;
        return (
            <div className={'row'}>
                {productList.map(product => <Product id={product.id} {...product}/>)}
            </div>
        );
    }
}
