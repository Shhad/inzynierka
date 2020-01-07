import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from './Header/Header';
import { OrderSpace } from './OrderSpace/OrderSpace';
import Loading from './Loading';

import history from '../history';

import { getOrders } from '../reducers/action-creators';

class OrderContainer extends React.Component {

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
        this.props.getOrders(this.props.userId);
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
                    <OrderSpace OrderList={this.props.orderList} />
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
        orderList: state.getIn(['reducerOrder', 'orderList']),
        isLoading: state.getIn(['reducerOrder', 'view', 'isLoading']),
        loggedIn: state.getIn(['reducerUser', 'isLogged']),
        userId: state.getIn(['reducerUser', 'user', 'userId'])
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getOrders: (userID) => dispatch(getOrders(userID))
    }
}

export const OrderC = connect(mapStateToProps, mapDispatchToProps)(OrderContainer);
