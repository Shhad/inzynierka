import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from './Header/Header';
import FavouriteSpace from './FavouriteSpace/FavouriteSpace';
import Loading from './Loading';

import { getFavourites } from '../reducers/action-creators';

class FavouriteContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: true,
            user: false,
        };
    }

    componentWillMount() {
        this.props.getFavourites();
    }

    render() {
        console.log('FavouriteContainer');
        console.log(this.props.favouriteList);
        return (
            <div style={{
                padding: '5px',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            }}>
                <Header />
                {this.props.isLoading ?
                    <Loading /> :
                    <FavouriteSpace favouriteList={this.props.favouriteList} />
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
        favouriteList: state.getIn(['reducerFavourite', 'favouriteList']),
        isLoading: state.getIn(['reducerFavourite', 'view', 'isLoading'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getFavourites: () => dispatch(getFavourites())
    }
}

export const Favourite = connect(mapStateToProps, mapDispatchToProps)(FavouriteContainer);
