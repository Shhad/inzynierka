import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from './Header/Header';
import { FavouriteSpace } from './FavouriteSpace/FavouriteSpace';
import Loading from './Loading';

import history from '../history';

import { getFavourites } from '../reducers/action-creators';

class FavouriteContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: true,
            user: false,
        };
        if(!this.props.loggedIn) {
            history.push('/');
        }
    }

    componentWillMount() {
        this.props.getFavourites(this.props.userId);
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
                <Header  loggedIn={this.props.loggedIn} />
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
        isLoading: state.getIn(['reducerFavourite', 'view', 'isLoading']),
        loggedIn: state.getIn(['reducerUser', 'isLogged']),
        userId: state.getIn(['reducerUser', 'user', 'userId'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getFavourites: (userID) => dispatch(getFavourites(userID))
    }
}

export const FavouriteC = connect(mapStateToProps, mapDispatchToProps)(FavouriteContainer);
